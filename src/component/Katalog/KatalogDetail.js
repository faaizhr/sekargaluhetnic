
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()

  

  // const {data, loading, error} = useSubscription(SubscriptionMenu, {variables: { _eq: id}})
  // // const { nama_menu, harga, deskripsi, foto, comments } = data.Chiliesious_menu
  // console.log("cek data", data)
  // // console.log("cek nama menu", nama_menu)
  const LoggedIn = Cookies.get("token")

  const {data: dataKatalog, loading: loadingKatalog, error: errorKatalog} = useQuery(GetAnotherKatalog, {variables: { _neq: id }})
  
  const {insertToCart, loadingInsertToCart} = useInsertToCart()
  const cart = () => {
    if(LoggedIn) {
      insertToCart({
        variables: {
          user_id: Cookies.get("okogaye"),
          katalog_id: id,
        }
      })
    } else {
      navigate("/login")
    }
  }


    return (
        <div>
          <Navbar/>
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
                  <h6 className="mb-1">Ukuran Pakaian</h6>
                  <p>Lebar Tubuh : </p>
                  <p>Panjang Tubuh : </p>
                  <p>Panjang Lengan : </p>
                  <p className="my-5">Stok Tersedia   :   1</p>
                  <div className="flex justify-start gap-2">
                    <button onClick={cart} className="text-white px-5 py-3 bg-secondary2 rounded-md hover:bg-white hover:text-secondary2 border border-secondary2 duration-200">Tambahkan ke Keranjang</button>
                    <button className="text-white px-4 py-3 bg-secondary rounded-md hover:bg-white hover:text-secondary border border-secondary duration-200">Langsung Beli</button>
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