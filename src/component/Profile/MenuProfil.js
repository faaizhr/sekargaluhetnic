import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate, Link} from "react-router-dom"

import { FiChevronRight } from "react-icons/fi"

import style from './Profile.module.css'
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import { GetUserProfileData } from "../../graphql/query";
import Cookies from "js-cookie";


function MenuProfil() {


    return(
        <div className="mb-5">
            <h6 className="uppercase font-medium mb-3">Pengaturan Profil</h6>
            <div className="ml-2 grid gap-1 mb-5">
                <p><Link to="/profil">Profil</Link></p>
                <p><Link to="/sunting-profil">Sunting Profil</Link></p>
                <p><Link to="/alamat">Alamat</Link></p>
                <p><Link to="/sunting-alamat">Sunting Alamat</Link></p>
                <p><Link to="/pesanan-pakaian">Riwayat Pesanan Pakaian</Link></p>
                <p><Link to="/pesanan-jahit">Riwayat Pesanan Jahit</Link></p>
                <p><Link to="/">Retur Barang</Link></p>
            </div>
            {/* <h6 className="uppercase font-medium mb-3">Ajukan Retur Barang</h6> */}
        </div>
    )
}

export default MenuProfil