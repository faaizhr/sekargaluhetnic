
import { gql, useLazyQuery, useQuery, useSubscription, useMutation } from "@apollo/client"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"
import { v1 } from "uuid";
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";


import KeranjangItem from "./keranjangItem"
import ListItem from "../Katalog/ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import style from "./keranjang.module.css"

import { GetKeranjangKatalog, GetSumKeranjang } from "../../graphql/query"
import { GetAnotherKatalog } from "../../graphql/query"
import useGetKeranjangKatalog from "../../hooks/useGetKeranjangKatalog"
import useInsertToCart from "../../hooks/useInsertToCart"
import { SubscriptionKeranjangKatalog } from "../../graphql/subscription"
import { SubscriptionSumKeranjang } from "../../graphql/subscription"
import { InsertPemesananFromKeranjang } from "../../graphql/mutation"

import { AiOutlineRight } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { borderTop } from "@mui/system"
import Cookies from "js-cookie"


const Keranjang = () => {
  const LoggedIn = Cookies.get("token")
  const navigate = useNavigate();

  const {data, loading, error} = useQuery(GetKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye") }})

  const {data: dataSubs, loading: loadingSubs, error:errorSubs} = useSubscription(SubscriptionKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye")}})

  console.log("cek length", dataSubs?.sekargaluhetnic_katalog.length)

  const {data: dataTotalProduk, loading: loadingTdataTotalProduk, error: errorTdataTotalProduk} = useSubscription(SubscriptionSumKeranjang, {variables: {_eq: Cookies.get("okogaye")}})
  
  const taxProduk = (11/100) * (dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga)

  const [insertPemesananFromKeranjang, {loading: loadingInsertPemesananFromKeranjang}] = useMutation(InsertPemesananFromKeranjang);

  
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  var newdate = year.toString() + month.toString()  + day.toString() + "-";
  // console.log("cek id", newdate + v1())


  const pemesanan = () => {
    if (LoggedIn) {
      if (!Cookies.get("pesanan-session")) {
        Cookies.set('pesanan-session', newdate + v1(), { expires: 1 })
        insertPemesananFromKeranjang({
          variables: {
            user_id: Cookies.get("okogaye"),
            pesanan_session: Cookies.get("pesanan-session"),
            status: "Menunggu Pembayaran",
            ongkir: 0,
            total_harga: 0,
            created_at: Date(),
          }
        })
        navigate("/pemesanan");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        navigate("/pemesanan");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
    }
  }
  

    return (
        <div>
          <Navbar/>
          <div className="container mx-auto flex justify-start items-center gap-2">
            <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
            <FiChevronRight/>
            <p className="font-semibold">Keranjang</p>
          </div>


          <div className="container mx-auto mt-4">
            {dataSubs?.sekargaluhetnic_katalog.length == 0 ? 
            <div className="my-10">
              <img src="https://cdn.discordapp.com/attachments/915505289174847510/1101853623983546389/No_data-rafiki.png" className="mx-auto -mt-20"></img>
              <h1 className="text-center font-semibold text-secondary">Keranjang Anda masih kosong, pilih katalog untuk dimasukkan ke keranjang . . .</h1>
              <p className="mt-10 text-center">
                <Link to="/katalog" className="bg-secondary px-10 py-2 text-white rounded-md mt-10 text-xl font-normal tracking-wider border border-secondary hover:bg-white hover:text-secondary duration-200">Katalog</Link>
              </p>
            </div>
            : 
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold text-primary my-14">KERANJANG BELANJA</h2>
              <div className="grid lg:grid-cols-12 gap-10 mt-5">
                <div className="col-span-8">
                  {dataSubs?.sekargaluhetnic_katalog.map((katalog) => <KeranjangItem key={katalog.id} items={katalog}/>)}
                </div>
                <div className="lg:col-span-4 col-span-8">
                  <div className="">
                    <div className="">
                      <h5 className="text-lg font-semibold mb-3 text-primary">RINGKASAN PESANAN | {data?.sekargaluhetnic_katalog?.length} PRODUK</h5>
                      <div className="flex justify-between">
                        <p>Subtotal produk</p>
                        <p>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between -mb-1 font-medium">
                        <h6 className="uppercase">Subtotal</h6>
                        <h6>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga?.toLocaleString()}</h6>
                      </div>
                      <div className="flex justify-between">
                        <p className="">Termasuk pajak</p>
                        <p>Rp{taxProduk?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between -mb-1 font-medium">
                        <h6 className="uppercase">total</h6>
                        <h6>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga?.toLocaleString()}</h6>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-lg font-semibold text-primary">KETENTUAN PENGGUNAAN</h5>
                      <p>Dengan menekan tombol pembayaran, Anda setuju dengan syarat dan ketentuan kami.</p>
                      <Link className="underline-offset-2" to="/"><u>KETENTUAN PENGGUNAAN</u></Link>
                      <div className="mt-7">
                        <button onClick={pemesanan} className="bg-secondary w-full py-2 border border-secondary text-white hover:bg-white hover:text-secondary duration-200 rounded-md">LANJUTKAN KE PEMESANAN</button>
                      </div>
                      <div className="mt-2">
                        <button className="bg-secondary3 w-full py-2 border border-secondary3 text-secondary hover:bg-white duration-200 rounded-md">LANJUT BELANJA</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>}
          </div>
          <Footer />
      </div>
    )

}

export default Keranjang