
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

import KeranjangItem from "../Keranjang/keranjangItem"
import ListItem from "../Katalog/ListItem"
import LoadingSvg  from "../Loading/LoadingSvgTransparent"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Pesanan.module.css"


import { AiOutlineRight } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { borderTop } from "@mui/system"

import { GetPesananJahitUser } from '../../graphql/query';
import { SubscriptionPesanan } from "../../graphql/subscription";
import { GetUserProfileData } from "../../graphql/query";
import Cookies from "js-cookie";

import PesananItem from "../Pesanan/pesananItem";



const Pesanan = () => {

    const {data: dataUser, loading, error} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})
    // console.log("cek data profile", dataUser)

    const {data: dataPesananJahit, loading: loadingPesananJahit, error: errorPesananJahit} = useQuery(GetPesananJahitUser, {variables: {_eq: Cookies.get("okogaye")}})

    const {data: dataPesanan, loading: loadingPesanan, error:errorPesanan} = useSubscription(SubscriptionPesanan, {variables: { _eq: Cookies.get("okogaye")}})
    console.log("cek data pesanaan", dataPesanan)

    return (
        <div>
          <Navbar/>
          <div className="container mx-auto flex justify-start items-center gap-2">
                <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
                <FiChevronRight/>
                <Link className="" to="/profil"><p>Profil</p></Link>
                <FiChevronRight/>
                <p className="font-semibold">Riwayat Pemesanan Pakaian</p>
          </div>
          
          <div className="container mx-auto mt-14">
            <h2 className="text-primary text-4xl lg:text-6xl font-bold uppercase mb-10">Riwayat Pemesanan Pakaian</h2>
            {loadingPesanan ? <LoadingSvg/> : 
            <div className="mt-10">
              {dataPesanan?.sekargaluhetnic_pesanan_pakaian?.map((el) => <PesananItem key={el.id} items={el} /> )}
            </div>
            }

          </div>
            
          <Footer />
      </div>
    )

}

export default Pesanan