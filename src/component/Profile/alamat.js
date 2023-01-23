import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate, Link} from "react-router-dom"

import MenuProfil from "./MenuProfil";

import { FiChevronRight } from "react-icons/fi"

import style from './Profile.module.css'
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import { GetUserProfileData } from "../../graphql/query";
import Cookies from "js-cookie";


function Alamat() {

    const {data: dataUser, loading, error} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})
    // console.log("cek data profile", dataUser)

    const data = dataUser?.sekargaluhetnic_user[0];
    console.log(data)

    const dataAlamat = dataUser?.sekargaluhetnic_user[0].alamats[0];
    console.log(dataAlamat)

    return(
        <div>
            <Navbar/>
                <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
                    <Link className="me-1" to="/katalog">SekarGaluhEtnic</Link>
                    <FiChevronRight/>
                    <p className="ms-1">Profil</p>
                    <FiChevronRight className="ms-1"/>
                    <p className="ms-1 ">Alamat</p>
                </div>
            <div className={`container mt-4 ${style.profil}`}>
              <h2>PROFIL</h2>
              <div className="row mt-4">
                <div className={`col-3 ${style.menuProfil}`}>
                    <MenuProfil/>
                </div>
                <div className="col-9">
                    <div className={style.contentAlamat}>
                        {( dataAlamat ? 
                        <div> 
                          <h5 className="mb-4">Alamat</h5>
                          <h6>Negara</h6>
                          <p>{dataAlamat?.negara}</p>
                          <h6>Provinsi</h6>
                          <p>{dataAlamat?.provinsi}</p>
                          <h6>Kabupaten / Kota</h6>
                          <p>{dataAlamat?.kabupaten_kota}</p>
                          <h6>Kecamatan</h6>
                          <p>{dataAlamat?.kecamatan}</p>
                          <h6>Kelurahan</h6>
                          <p>{dataAlamat?.kelurahan}</p>
                          <h6>Detail Alamat</h6>
                          <p>{dataAlamat?.alamat}</p>
                          <h6>Kode Pos</h6>
                          <p>{dataAlamat?.kodepos}</p>
                          <h5 className="mb-2 mt-4">Alamat Lengkap</h5>
                          <p>{dataAlamat?.alamat}, {dataAlamat?.kelurahan}, {dataAlamat?.kecamatan}, {dataAlamat?.kabupaten_kota}, {dataAlamat?.provinsi}, {dataAlamat?.negara}, {dataAlamat?.kodepos}</p>
                        </div> : 
                        <p>Belum ada alamat. <Link to="/">Tambahkan alamat</Link></p>
                        )}
                    </div>
                </div>
              </div>
            </div>
            <Footer />
        </div>
    )
}

export default Alamat