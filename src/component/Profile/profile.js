import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate, Link} from "react-router-dom"

import { FiChevronRight } from "react-icons/fi"

import style from './Profile.module.css'
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import { GetUserProfileData } from "../../graphql/query";
import Cookies from "js-cookie";


function Profile() {

    const {data: dataUser, loading, error} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})
    // console.log("cek data profile", dataUser)

    const data = dataUser?.sekargaluhetnic_user[0];
    console.log(data)
    

    return(
        <div>
            <Navbar/>
                <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
                    <Link className="me-1" to="/katalog">SekarGaluhEtnic</Link>
                    <FiChevronRight/>
                    <p className="ms-1">Profil</p>
                </div>
            <div className={`container mt-4 ${style.profil}`}>
              <h2>PROFIL</h2>
              <div className="row mt-4">
                <div className={`col-3 ${style.menuProfil}`}>
                    <h6>Pengaturan Profil</h6>
                    <p><Link to="/profil">Profil</Link></p>
                    <p><Link to="/">Sunting Profil</Link></p>
                    <p><Link to="/alamat">Alamat</Link></p>
                    <p><Link to="/">Ubah Kata Sandi</Link></p>
                    <p><Link to="/">Riwayat Transaksi</Link></p>
                </div>
                <div className="col-9">
                    <div className={style.contentProfil}>
                        <h5 className="mb-4">Profil</h5>
                        <h6>Alamat Email</h6>
                        <p>{data?.email}</p>
                        <h6>Nama</h6>
                        <p>{data?.name}</p>
                        <h6>No. Telefon</h6>
                        <p>{data?.telephone}</p>
                        <h6>Jenis Kelamin</h6>
                        <p>{data?.jenis_kelamin}</p>
                    </div>
                </div>
              </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile