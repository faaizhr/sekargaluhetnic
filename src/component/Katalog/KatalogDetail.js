
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

import ListItem from "./ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Katalog.module.css"

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

  

  // const {data, loading, error} = useSubscription(SubscriptionMenu, {variables: { _eq: id}})
  // // const { nama_menu, harga, deskripsi, foto, comments } = data.Chiliesious_menu
  // console.log("cek data", data)
  // // console.log("cek nama menu", nama_menu)

  const {data: dataKatalog, loading: loadingKatalog, error: errorKatalog} = useQuery(GetAnotherKatalog, {variables: { _neq: id }})


  // const [nama, setNama] = useState("")
  // const [feedback, setFeedback] = useState("")
  
  const {insertToCart, loadingInsertToCart} = useInsertToCart()
  const cart = () => {
    insertToCart({
      variables: {
        user_id: Cookies.get("okogaye"),
        katalog_id: id,
      }
    })
  }

  // const handleChangeNama = (e) => {
  //   setNama(e.target.value)
  // }

  // const handleChangeFeedback = (e) => {
  //   setFeedback(e.target.value)
  // }


    return (
        <div>
          <Navbar/>
          <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
            <Link className="me-1" to="/katalog">Katalog</Link>
            <FiChevronRight/>
            <p className="ms-1">{location.state.nama}</p>
          </div>

          <div className={`container mt-5`}>
            <div className="row">
              <div className={`col-lg-7 ${style.fotoProduk}`}>
                <img src={location.state.foto}></img>
              </div>
              <div className={`col-lg-5 ${style.penjelasanProduk}`}>
                <div className={style.deskripsi}>
                  <h4>{location.state.nama}</h4>
                  <h5 className="mt-1">Rp{location.state.harga.toLocaleString()}</h5>
                  <p className="mt-4">{location.state.deskripsi}</p>
                </div>
                <div className="pt-4">
                  <h6>Ukuran Pakaian</h6>
                  <p>Lebar Tubuh : </p>
                  <p>Panjang Tubuh : </p>
                  <p>Panjang Lengan : </p>
                  <p className="mt-5">Stok Tersedia   :   1</p>
                  <button onClick={cart} className={style.masukkanKeranjang}>Tambahkan ke Keranjang</button>
                  <button className={style.beliLangsung}>Langsung Beli</button>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </p>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className={`mt-5${style.anotherKatalog}`}>
              <h4 className="mb-3">Pakaian Lainnya</h4>
              <div className="d-flex justify-content-between flex-wrap">
              {dataKatalog?.sekargaluhetnic_katalog?.map((katalog) => <ListItem key={katalog.id} items={katalog}/>)}
              </div>
            </div>

          </div>
          <Footer />
      </div>
    )

}

export default KatalogDetail