// import ListItem from "./ListItem"
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

import ListItem from "./ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import { AiOutlineRight } from "react-icons/ai";
import useSubscriptionMenuDetail from "../../hooks/useSubscriptionMenuDetail"
// import useInsertRating from "../../hooks/useInsertRating"
import useInsertComment from "../../hooks/useInsertComment"
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import style from "./Detail.module.css"
import { GetAnotherMenu, GetMenuDetail } from "../../graphql/query"

const SubscriptionMenu = gql `
subscription MySubscription($_eq: Int!) {
  Chiliesious_menu(where: {id: {_eq: $_eq}}) {
    nama_menu
    id
    harga
    foto
    deskripsi
    penjelasan
    komposisi
    comments {
      nama
      feedback
    }
  }
}
`;


const KatalogDetail = () => {
  
  const location = useLocation()
  const { id } = location.state
  console.log("cek state", location.state)

  

  const {data, loading, error} = useSubscription(SubscriptionMenu, {variables: { _eq: id}})
  // const { nama_menu, harga, deskripsi, foto, comments } = data.Chiliesious_menu
  console.log("cek data", data)
  // console.log("cek nama menu", nama_menu)

  const {data: dataMenu, loading: loadingMenu, error: errorMenu} = useQuery(GetAnotherMenu, {variables: { _neq: id }})
  console.log("cek menu lainnya", dataMenu)


  const [nama, setNama] = useState("")
  const [feedback, setFeedback] = useState("")
  
  const {insertComment, loadingInsertComment} = useInsertComment()
  const comment = () => {
    if (nama == "" || feedback == "") {
      toast.error("Nama dan Ulasan TIDAK BOLEH Kosong")
      return;
    } else
    toast.success("Terima Kasih atas Ulasan Anda")
    insertComment({
      variables: {
        menu_id: id,
        nama: nama,
        feedback: feedback
      }
    })
  }

  const handleChangeNama = (e) => {
    setNama(e.target.value)
  }

  const handleChangeFeedback = (e) => {
    setFeedback(e.target.value)
  }


    return (
        <div>
          <Navbar/>
            <h1>DETAIL KATALOG</h1>
          <Footer />
      </div>
    )


    // return (
    //     <div>
    //         <h4>Detail Comics</h4>
    //         <p>{id}</p>
    //         <p>{title}</p>
    //         <p>{penulis}</p>
    //         <p>{penerbit}</p>
    //         <p>{tahunTerbit}</p>
    //     </div>
    // )
}

export default KatalogDetail