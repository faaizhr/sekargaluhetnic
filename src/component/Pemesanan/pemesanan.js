
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

import KeranjangItem from "../Keranjang/keranjangItem"
import ListItem from "../Katalog/ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Pemesanan.module.css"

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


import { GetUserProfileData } from "../../graphql/query";
import Cookies from "js-cookie";



const Pemesanan = () => {

  const {data, loading, error} = useQuery(GetKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye") }})

  const {data: dataSubs, loading: loadingSubs, error:errorSubs} = useSubscription(SubscriptionKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye")}})

  const {data: dataTotalProduk, loading: loadingTdataTotalProduk, error: errorTdataTotalProduk} = useSubscription(SubscriptionSumKeranjang, {variables: {_eq: Cookies.get("okogaye")}})
  const taxProduk = (11/100) * (dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga)
  
  const {data: dataUser, loading: loadingUser, error: errorUser} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})
  const dataAlamat = dataUser?.sekargaluhetnic_user[0].alamats[0];
  console.log(dataAlamat)


    return (
        <div>
          <Navbar/>
          <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
            <Link className="me-1" to="/katalog">Katalog</Link>
            <FiChevronRight/>
            <p className="ms-1">Keranjang</p>
          </div>

          <div className={`container mt-4 ${style.pemesanan}`}>
            <h2>PEMESANAN DAN PEMBAYARAN</h2>
            <div className="row mt-5">
              <div className={`col-md-8`}>
                <div className={style.pemesananPembayaran}>
                  <div className={style.alamatPengiriman}>
                    <h5>ALAMAT PENGIRIMAN</h5>
                    {(dataAlamat ? 
                    <p>{dataAlamat?.alamat}, {dataAlamat?.kelurahan}, {dataAlamat?.kecamatan}, {dataAlamat?.kabupaten_kota}, {dataAlamat?.provinsi}, {dataAlamat?.negara}, {dataAlamat?.kodepos}</p> :
                    <p>Belum ada alamat</p>
                    )}
                  </div>
                  <div className={style.opsiPengiriman}>
                    <h5>OPSI PENGIRIMAN</h5>
                    <h6>Pemberitahuan</h6>
                    <p>Dalam opsi pengiriman tidak terdapat pilihan kurir, kurir yang kami gunakan adalah kurir yang sudah bermitra dengan kami. Hanya terdapat pilihan kelas pengiriman yang berpengaruh kepada waktu sampai barang.</p>
                    <div className={style.pilihanPengiriman}>
                      <input type="radio" id="age1" name="age" value="30"/>
                      <label for="age1">Reguler</label><br/>
                      <p for="age1">JABODETABEK: 1-3 hari kerja, Pulau Jawa: 2-11 hari kerja, Luar Pulau Jawa: 4-14 hari kerja</p>
                      <input type="radio" id="age2" name="age" value="60"/>
                      <label for="age2">Cepat</label><br/>
                      <p for="age1">JABODETABEK: NEXTDAY, Pulau Jawa: 2-5 hari kerja, Luar Pulau Jawa: 4-8 hari kerja</p>
                    </div>
                  </div>
                </div>
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
                    <h5>PRODUK YANG DIPESAN</h5>
                    <div className={style.katalogPemesanan}>
                      {dataSubs?.sekargaluhetnic_katalog?.map((katalog) => 
                        <div className="row mb-2">
                          <div className="col-4 ">
                            <img className="" src={katalog?.foto}></img>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                            <h6 className="ms-3">{katalog.nama}</h6>
                          </div>
                        </div>
                      )}
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

export default Pemesanan