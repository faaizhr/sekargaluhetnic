import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate, Link} from "react-router-dom"
import axios from "axios";

import MenuProfil from "./MenuProfil";

import { FiChevronRight } from "react-icons/fi"

import style from './Profile.module.css'
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import { GetUserProfileData } from "../../graphql/query";
import Cookies from "js-cookie";
// import { fetchToCurl } from 'fetch-to-curl';

function Alamat() {

    const {data: dataUser, loading, error} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})
    // console.log("cek data profile", dataUser)

    const data = dataUser?.sekargaluhetnic_user[0];
    // console.log(data)

    const dataAlamat = dataUser?.sekargaluhetnic_user[0].alamats[0];
    // console.log(dataAlamat)



    // useEffect(() => {

    //     axios
    //       .get("https://api.rajaongkir.com/starter/city", {
    //         headers: {
    //             'Key' :'5caf420e58934a671ab0699a2fb241b3',
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Access-Control-Allow-Origin' : '*'
    //         }
    //       })
    //       .then((res) => {
    //         console.log(res)
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         console.log("Data gak ketemu");
    //       });
    //   }, []);

    return(
        <div>
            <Navbar/>
            <div className="container mx-auto flex justify-start items-center gap-2">
                <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
                <FiChevronRight/>
                <Link className="" to="/profil"><p>Profil</p></Link>
                <FiChevronRight/>
                <p className="font-semibold">Alamat</p>
            </div>

            <div className="container mx-auto mt-4">
              <h2 className="text-primary text-6xl font-bold">PROFIL</h2>
              <div className="grid lg:grid-cols-12 mt-4">
                <div className={`col-span-3`}>
                    <MenuProfil/>
                </div>
                <div className="col-span-9">
                    <div className="border rounded-md p-5">
                        {( dataAlamat ? 
                        <div> 
                          <h5 className="mb-3 font-semibold uppercase">Alamat</h5>
                          <h6 className="font-medium">Negara</h6>
                          <p className="mb-2">{dataAlamat?.negara}</p>
                          <h6 className="font-medium">Provinsi</h6>
                          <p className="mb-2">{dataAlamat?.provinsi}</p>
                          <h6 className="font-medium">Kabupaten / Kota</h6>
                          <p className="mb-2">{dataAlamat?.kabupaten_kota}</p>
                          <h6 className="font-medium">Kecamatan</h6>
                          <p className="mb-2">{dataAlamat?.kecamatan}</p>
                          <h6 className="font-medium">Kelurahan</h6>
                          <p className="mb-2">{dataAlamat?.kelurahan}</p>
                          <h6 className="font-medium">Detail Alamat</h6>
                          <p className="mb-2">{dataAlamat?.alamat}</p>
                          <h6 className="font-medium">Kode Pos</h6>
                          <p className="mb-5">{dataAlamat?.kodepos}</p>
                          <h5 className="font-semibold">Alamat Lengkap</h5>
                          <p className="mb-2 text-base">{dataAlamat?.alamat}, {dataAlamat?.kelurahan}, {dataAlamat?.kecamatan}, {dataAlamat?.kabupaten_kota}, {dataAlamat?.provinsi}, {dataAlamat?.negara}, {dataAlamat?.kodepos}</p>
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