
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

import KeranjangItem from "./keranjangItem"
import ListItem from "../Katalog/ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./keranjang.module.css"

import { GetKeranjangKatalog, GetSumKeranjang } from "../../graphql/query"
import { GetAnotherKatalog } from "../../graphql/query"
import useGetKeranjangKatalog from "../../hooks/useGetKeranjangKatalog"
import useInsertToCart from "../../hooks/useInsertToCart"
import { SubscriptionKeranjangKatalog } from "../../graphql/subscription"
import { SubscriptionSumKeranjang } from "../../graphql/subscription"

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

  const {data, loading, error} = useQuery(GetKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye") }})

  const {data: dataSubs, loading: loadingSubs, error:errorSubs} = useSubscription(SubscriptionKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye")}})

  const {data: dataTotalProduk, loading: loadingTdataTotalProduk, error: errorTdataTotalProduk} = useSubscription(SubscriptionSumKeranjang, {variables: {_eq: Cookies.get("okogaye")}})
  const taxProduk = (11/100) * (dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga)
  

    return (
        <div>
          <Navbar/>
          <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
            <Link className="me-1" to="/katalog">Katalog</Link>
            <FiChevronRight/>
            <p className="ms-1">Keranjang</p>
          </div>

          <div className={`container mt-4 ${style.keranjang}`}>
            <h4>KERANJANG BELANJA</h4>
            <div className="row mt-5">
              <div className="col-md-8">
                {dataSubs?.sekargaluhetnic_katalog?.map((katalog) => <KeranjangItem key={katalog.id} items={katalog}/>)}
              </div>
              <div className="col-md-4">
                <div className={style.keranjangPembayaran}>
                  <div className={style.hargaKeranjang}>
                    <h5>RINGKASAN PESANAN | {data?.sekargaluhetnic_katalog?.length} PRODUK</h5>
                    <div className="d-flex justify-content-between">
                      <p>Subtotal produk</p>
                      <p>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga.toLocaleString()}</p>
                    </div>
                    <div className="d-flex justify-content-between mb-n1">
                      <h6 className="text-uppercase">Subtotal</h6>
                      <h6>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga.toLocaleString()}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="">Termasuk pajak</p>
                      <p>Rp{taxProduk.toLocaleString()}</p>
                    </div>
                    <div className="d-flex justify-content-between mb-n1">
                      <h6 className="text-uppercase">Subtotal</h6>
                      <h6>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga.toLocaleString()}</h6>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5>KETENTUAN PENGGUNAAN</h5>
                    <p>Dengan menekan tombol pembayaran, Anda setuju dengan syarat dan ketentuan kami.</p>
                    <Link to="/">KETENTUAN PENGGUNAAN</Link>
                    <div className={`mt-4 ${style.primaryButton}`}>
                      <button>LANJUTKAN KE PEMBAYARAN</button>
                    </div>
                    <div className={`mt-2 ${style.secondaryButton}`}>
                      <button>LANJUT BELANJA</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
      </div>
    )

}

export default Keranjang