
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

import KeranjangItem from "../Keranjang/keranjangItem"
import ListItem from "../Katalog/ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Pesanan.module.css"

import { GetKeranjangKatalog, GetSumKeranjang } from "../../graphql/query"
import { GetAnotherKatalog } from "../../graphql/query"
import useGetKeranjangKatalog from "../../hooks/useGetKeranjangKatalog"
import useInsertToCart from "../../hooks/useInsertToCart"
import useInsertToPemesanan from "../../hooks/useInsertToPemesanan"
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



const Pesanan = () => {

    return (
        <div>
          <Navbar/>
          <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
            <Link className="me-1" to="/katalog">Katalog</Link>
            <FiChevronRight/>
            <p className="ms-1">Pesanan Pakaian</p>
          </div>
            
          <Footer />
      </div>
    )

}

export default Pesanan