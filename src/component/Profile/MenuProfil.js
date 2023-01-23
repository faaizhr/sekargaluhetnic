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
        <div>
            <h6>Pengaturan Profil</h6>
            <p><Link to="/profil">Profil</Link></p>
            <p><Link to="/sunting-profil">Sunting Profil</Link></p>
            <p><Link to="/alamat">Alamat</Link></p>
            <p><Link to="/sunting-alamat">Sunting Alamat</Link></p>
            <p><Link to="/ubah-katasandi">Ubah Kata Sandi</Link></p>
            <p><Link to="/riwayat-transaksi">Riwayat Transaksi</Link></p>
        </div>
    )
}

export default MenuProfil