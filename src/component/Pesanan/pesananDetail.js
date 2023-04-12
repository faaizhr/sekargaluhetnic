
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
          <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
            <Link className="me-1" to="/katalog">Katalog</Link>
            <FiChevronRight/>
            {/* <p className="ms-1">{location.state.nama}</p> */}
          </div>

          <div className={`container mt-5`}>
            <p>Detail Pesanan</p>
            <div>
              <div>
                {/* <img src={location.state.katalog.foto} /> */}
              </div>
              <div>
                {/* <p>{location.state.katalog.nama}</p>
                <p>{location.state.id}</p>
                <p>{location.state.katalog.deskripsi}</p>
                <p>Rp.{location.state.katalog.harga.toLocaleString()}</p>
                <p>{location.state.ongkir}</p>
                <p>{location.state.status}</p> */}
              </div>
              <div>
                <button onClick={popUpModal}>Chat</button>
                <div className={ chatModal ? 'd-block': 'd-none' }>
                  <div className={style.chat}>
                    <Chat id={location.state.id} />
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