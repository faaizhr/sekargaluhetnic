
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

// import ListItem from "./ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Pesanan.module.css"

import { GetAnotherKatalog } from "../../graphql/query"
import useInsertToCart from "../../hooks/useInsertToCart"

import { AiOutlineRight } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { borderTop } from "@mui/system"

import Chat from "../Chat/chat";
import Cookies from "js-cookie"

const SubscriptionChat = gql `
subscription MySubscription($_eq: Int!) {
  sekargaluhetnic_chat(where: {pesanan_pakaian_id: {_eq: $_eq}}) {
    id
    message
    pesanan_pakaian_id
    user_id
  }
}
`;


const PesananDetail = () => {
  
  const location = useLocation()
  const { id } = location.state
  console.log("cek state", location.state)
  const navigate = useNavigate()

  const {data: dataChat, loading: loadingChat, error:errorChat} = useSubscription(SubscriptionChat, {variables: { _eq: location.state.id}})
  console.log("cek data pesanaan", dataChat)

  const [chatModal, setChatModal] = useState(false);

  const popUpModal = () => {
    if (chatModal == false) {
      setChatModal(true)
    } else if (chatModal == true) {
      setChatModal(false)
    }
  }

    return (
        <div className="detailPesanan">
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
                {location.state.pesanans.map((pesanan) => 
                  <div className="grid grid-cols-5 mb-5 gap-10 border-b pb-5">
                    <div className="col-span-2">
                      <img className="w-56 h-72 object-cover rounded-md" src={pesanan.katalog.foto} />
                    </div>
                    <div className="col-span-3">
                      <p className="font-medium text-lg text-primary">{pesanan.katalog.nama}</p>
                      <p>{pesanan.katalog.deskripsi}</p>
                      <p className="font-semibold text-lg text-primary mt-3">Rp{pesanan.katalog.harga.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-4 col-span-8">
                <h6 className="font-medium text-base">Alamat Pengiriman</h6>
                <p>{location.state.user.alamats[0].alamat}, {location.state.user.alamats[0].kelurahan}, {location.state.user.alamats[0].kecamatan}, {location.state.user.alamats[0].kabupaten_kota}, {location.state.user.alamats[0].provinsi}, {location.state.user.alamats[0].negara}, {location.state.user.alamats[0].kodepos}</p>
                <h6 className="font-medium text-base mt-3">Biaya Ongkos Kirim</h6>
                <p>Rp{location.state.ongkir}</p>
                <h6 className="font-medium text-base mt-3">Total Biaya</h6>
                <p>Rp{location.state.total_harga}</p>
                <h6 className="font-medium text-base mt-3">Status</h6>
                <p>{location.state.status}</p>
                <h6 className="font-medium text-base mt-3">Waktu Pemesanan</h6>
                <p>{location.state.created_at}</p>
                <h6 className="font-medium text-base mt-3">Kode Pemesanan</h6>
                <p>{location.state.created_at}</p>

                <button className="bg-secondary text-white w-full rounded-md py-2 mt-5 border border-secondary hover:bg-white hover:text-secondary duration-200" onClick={popUpModal}>Chat</button>
                <div className={ chatModal ? 'block': 'hidden' }>
                  <div className="w-[400px] fixed bottom-5 right-5 bg-white border shadow px-1 py-2 rounded-md">
                    <Chat id={location.state.id} popUp={popUpModal} chatModal={chatModal}/>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <Footer />
      </div>
    )

}

export default PesananDetail