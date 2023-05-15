import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

// import ListItem from "./ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Pesanan.module.css"
import ChatJahit from "../Chat/chatJahit";

import { GetAnotherKatalog } from "../../graphql/query"
import useInsertToCart from "../../hooks/useInsertToCart"
import { GetUserProfileData } from "../../graphql/query";

import { AiOutlineRight } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi"

import Cookies from "js-cookie";

const PesananJahitDetail = () => {

  const {data, loading, error} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye")}})
  const dataUser = data?.sekargaluhetnic_user[0];

  const location = useLocation()
  const { id } = location.state
  console.log("cek state", location.state)
  const navigate = useNavigate()

  const [chatModal, setChatModal] = useState(false);

  const popUpModal = () => {
    if (chatModal == false) {
      setChatModal(true)
    } else if (chatModal == true) {
      setChatModal(false)
    }
  }

  return(
    <div>
      <Navbar/>
      <div className="container mx-auto flex justify-start items-center gap-2">
        <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
        <FiChevronRight/>
        <Link className="" to="/riwayat-pesanan"><p>Riwayat Pesanan</p></Link>
        <FiChevronRight/>
        <p className="font-semibold">Profil</p>
      </div>

      <div className={`container mx-auto mt-14`}>
            <h2 className="text-primary text-4xl lg:text-6xl font-bold uppercase">Detail Pesanan</h2>
            <div className="my-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="col-span-8">
                <div>
                  <h6 className="font-medium">Jenis Pakaian</h6>
                  <p>{location.state.jenis_pakaian}</p>
                </div>
                <div className="mt-3">
                  <h6 className="font-medium">Kain</h6>
                  <p>{location.state.kain}</p>
                </div>
                <div className="mt-3">
                  <h6 className="font-medium">Ukuran Tubuh</h6>
                  <div className="border p-3 rounded-md">
                    <p>Panjang Baju : {location.state.panjang_baju} cm</p>
                    <p>Panjang Lengan : {location.state.panjang_lengan} cm</p>
                    <p>Lebar Bahu : {location.state.lebar_bahu} cm</p>
                    <p>Lingkar Dada : {location.state.lingkar_dada} cm</p>
                    <p>Lingkar Kerung Lengan : {location.state.lingkar_kerung_lengan} cm</p>
                    <p>Lingkar Pergelangan Tangan : {location.state.lingkar_pergelangan_tangan} cm</p>
                    <p>Lingkar Pinggang : {location.state.lingkar_pinggang} cm</p>
                    <p>Lingkar Pinggul : {location.state.lingkar_pinggul} cm</p>
                    <p>Lingkar Leher : {location.state.lingkar_leher} cm</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h6 className="font-medium">Foto Desain</h6>
                  <div className="border p-3 rounded-md">
                    {location.state.foto_desains.map((el) => 
                    <div>
                      <a href={el.foto} target="_blank">
                        <img className="w-40 h-40 object-cover"  src={el.foto}></img>
                      </a>
                    </div>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <h6 className="font-medium">Deskripsi Desain</h6>
                  <div className="border p-3 rounded-md">
                    <div className="text-sm list-disc" dangerouslySetInnerHTML={{__html: location.state.deskripsi}}></div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4 col-span-8">
                <h6 className="font-medium text-base">Alamat Pengiriman</h6>
                <p>{dataUser?.alamats[0].alamat}, {dataUser?.alamats[0].kelurahan}, {dataUser?.alamats[0].kecamatan}, {dataUser?.alamats[0].kabupaten_kota}, {dataUser?.alamats[0].provinsi}, {dataUser?.alamats[0].negara}, {dataUser?.alamats[0].kodepos}</p>
                <h6 className="font-medium text-base mt-3">Biaya Ongkos Kirim</h6>
                <p>Rp{location.state.ongkir}</p>
                <h6 className="font-medium text-base mt-3">Total Biaya</h6>
                <p>Rp{location.state.total_biaya}</p>
                <h6 className="font-medium text-base mt-3">Status</h6>
                <p>{location.state.status}</p>
                <h6 className="font-medium text-base mt-3">Waktu Pemesanan</h6>
                <p>{location.state.created_at}</p>
                <h6 className="font-medium text-base mt-3">Kode Pemesanan</h6>
                <p>{location.state.created_at}</p>

                <button className="bg-secondary text-white w-full rounded-md py-2 mt-5 border border-secondary hover:bg-white hover:text-secondary duration-200" onClick={popUpModal}>Chat</button>
                <div className={ chatModal ? 'block': 'hidden' }>
                  <div className="w-[400px] fixed bottom-5 right-5 bg-white border shadow px-1 py-2 rounded-md">
                    <ChatJahit id={location.state.id} popUp={popUpModal} chatModal={chatModal}/>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <Footer />
    </div>
  )
}

export default PesananJahitDetail