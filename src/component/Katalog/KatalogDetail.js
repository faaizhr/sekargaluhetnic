
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

import ListItem from "./ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Katalog.module.css"

import { GetKeranjangKatalog, GetSumKeranjang } from "../../graphql/query"
import { GetAnotherKatalog } from "../../graphql/query"
import useInsertToCart from "../../hooks/useInsertToCart"
import { SubscriptionKeranjangKatalog } from "../../graphql/subscription"

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

// const SubscriptionMenu = gql `
// subscription MySubscription($_eq: Int!) {
//   Chiliesious_menu(where: {id: {_eq: $_eq}}) {
//     nama_menu
//     id
//     harga
//     foto
//     deskripsi
//     penjelasan
//     komposisi
//     comments {
//       nama
//       feedback
//     }
//   }
// }
// `;


const KatalogDetail = () => {
  
  const location = useLocation()
  const { id } = location.state
  console.log("cek state", location.state)
  const navigate = useNavigate()

  // const {data, loading, error} = useQuery(GetKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye") }})
  const {data: dataSubs, loading: loadingSubs, error:errorSubs} = useSubscription(SubscriptionKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye")}})
  console.log("cek data", dataSubs)

  

  // const {data, loading, error} = useSubscription(SubscriptionMenu, {variables: { _eq: id}})
  // // const { nama_menu, harga, deskripsi, foto, comments } = data.Chiliesious_menu
  // console.log("cek data", data)
  // // console.log("cek nama menu", nama_menu)
  const LoggedIn = Cookies.get("token")

  const {data: dataKatalog, loading: loadingKatalog, error: errorKatalog} = useQuery(GetAnotherKatalog, {variables: { _neq: id }})

  const isOnCart = dataSubs?.sekargaluhetnic_katalog.find(({ id }) => id === location.state.id)
  console.log("isoncart", isOnCart)
  
  const {insertToCart, loadingInsertToCart} = useInsertToCart()
  const cart = () => {
    if(LoggedIn) {
      if(isOnCart != undefined) {
        toast.error("Katalog sudah ada dikeranjang")
      } else {
        insertToCart({
          variables: {
            user_id: Cookies.get("okogaye"),
            katalog_id: id,
          }
        })
      }
    } else {
      navigate("/login")
    }
  }

  const langsungBeli = () => {
    if(LoggedIn) {
      insertToCart({
        variables: {
          user_id: Cookies.get("okogaye"),
          katalog_id: id,
        }
      })
      navigate("/pemesanan")
      setTimeout(() => {
        window.location.reload()
      }, 500);
    } else {
      navigate("/login")
    }
  }


    return (
        <div>
          <Navbar/>
          <ToastContainer/>
          <div className="container mx-auto flex justify-start items-center gap-2">
            <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
            <FiChevronRight/>
            <Link className="" to="/katalog"><p>Katalog</p></Link>
            <FiChevronRight/>
            <p className="font-semibold">{location.state.nama}</p>
          </div>

          <div className="container mx-auto mt-10">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="col-span-7">
                <img src={location.state.foto} className="w-[520px] rounded-md"></img>
              </div>
              <div className="col-span-5">
                <div className="border-b pb-5">
                  <h4 className="font-bold text-5xl text-secondary">{location.state.nama}</h4>
                  <h5 className="mt-2 font-semibold text-2xl text-secondary">Rp{location.state.harga.toLocaleString()}</h5>
                  <p className="mt-4">{location.state.deskripsi}</p>
                </div>
                <div className="pt-4">
                  {/* <p className="font-semibold text-gray-500">{location.state.kode_produk}</p> */}
                  <h6 className="mb-1 font-medium text-sm">Ukuran Pakaian</h6>
                  <p className="border rounded-md p-2 w-fit">{location.state.ukuran}</p>
                  <p className="my-5">Stok Tersedia   :   {location.state.stok}</p>
                  <div className="flex justify-start gap-2">
                    <button onClick={cart} className="text-white px-5 py-3 bg-secondary2 rounded-md hover:bg-white hover:text-secondary2 border border-secondary2 duration-200">Tambahkan ke Keranjang</button>
                    <button onClick={langsungBeli} className="text-white px-4 py-3 bg-secondary rounded-md hover:bg-white hover:text-secondary border border-secondary duration-200">Langsung Beli</button>
                  </div>
                </div>
              </div>

            </div>
            <div className={style.accordion}>
              <Accordion style={{ 
                boxShadow: "none", 
                borderTop: "1px solid #DDDDDD",
                borderRadius: "0px" 
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p>Material Kain</p>
                </AccordionSummary>
                <AccordionDetails>
                  <p>
                    {location.state.material}
                  </p>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{ 
                boxShadow: "none"
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <p>Kebijakan Pengembalian</p>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="list-disc text-sm ml-5">
                    <li className="mb-2">Periode dalam pengembalian produk melalui pembelian online hanya berlaku maksimum 30 (tiga puluh) hari sejak tanggal pembelian.</li>
                    <li className="mb-2">Syarat pengembalian produk melalui pembelian online adalah dalam kondisi baru, belum digunakan, dan belum pernah dicuci</li>
                    <li className="mb-2">Jumlah dana yang dikembalikan berdasarkan pada jumlah yang telah Anda bayar</li>
                    <li className="mb-2">Kami berhak untuk menolak pengembalian jika produk tidak memenuhi persyaratan kebijakan pengembalian di atas.</li>
                    <li className="mb-2">Kami berhak mengubah kebijakan ini setiap saat tanpa pemberitahuan.</li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className="my-20">
              <h4 className="mb-5 text-3xl font-bold text-primary">Pakaian Lainnya</h4>
              <div className="flex justify-start gap-10">
              {dataKatalog?.sekargaluhetnic_katalog?.map((katalog) => <ListItem key={katalog.id} items={katalog}/>)}
              </div>
            </div>

          </div>
          <Footer />
      </div>
    )

}

export default KatalogDetail