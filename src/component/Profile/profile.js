import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate, Link} from "react-router-dom"

import { FiChevronRight } from "react-icons/fi"

import style from './Profile.module.css'
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client";

import { GetUserProfileData } from "../../graphql/query";
import { GetPesananJahitUser } from '../../graphql/query';
import { SubscriptionPesanan } from "../../graphql/subscription";

import PesananItem from "../Pesanan/pesananItem";
import MenuProfil from "./MenuProfil";
import PesananJahitItem from "../Pesanan/pesananJahitItem";

import Cookies from "js-cookie";


function Profile() {

    // const handleDetail = () => {
    //     navigate(`/pesanan-pakaian/${items.id}`, {
    //         state: {
    //             id: items.id,
    //             nama: items.nama,
    //             harga: items.harga,
    //             deskripsi: items.deskripsi,
    //             foto: items.foto
    //         }
    //     })
    // }

    const {data: dataUser, loading, error} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})
    // console.log("cek data profile", dataUser)

    const {data: dataPesananJahit, loading: loadingPesananJahit, error: errorPesananJahit} = useQuery(GetPesananJahitUser, {variables: {_eq: Cookies.get("okogaye")}})

    const {data: dataPesanan, loading: loadingPesanan, error:errorPesanan} = useSubscription(SubscriptionPesanan, {variables: { _eq: Cookies.get("okogaye")}})
    console.log("cek data pesanaan", dataPesanan)

    const data = dataUser?.sekargaluhetnic_user[0];
    // console.log(data)

    // console.log("cek pesanan", dataPesananJahit)
    // console.log("cek time stamp", dataPesananJahit?.sekargaluhetnic_pesanan_jahit[0]?.updated_at)
    var timestamp = dataPesananJahit?.sekargaluhetnic_pesanan_jahit[0]?.updated_at
    console.log(timestamp)

    var year = parseInt(dataPesananJahit?.sekargaluhetnic_pesanan_jahit[0]?.updated_at.substring(0, 4));
    var month = parseInt(dataPesananJahit?.sekargaluhetnic_pesanan_jahit[0]?.updated_at.substring(5, 7)); 
    var day = parseInt(dataPesananJahit?.sekargaluhetnic_pesanan_jahit[0]?.updated_at.substring(8, 10)); 
    var hour = parseInt(dataPesananJahit?.sekargaluhetnic_pesanan_jahit[0]?.updated_at.substring(11, 13)); 
    var minute = parseInt(dataPesananJahit?.sekargaluhetnic_pesanan_jahit[0]?.updated_at.substring(14, 16)); 

const [waktu, setWaktu] = useState("")

    // useEffect(() => {
    //     hour
    //   }, []);
    

    console.log(year)
    var fulltime = day + " " + month + " " + year + " " + hour + " " + minute
    console.log("cek fulltime", fulltime)

    console.log("cek jahit", dataPesananJahit?.sekargaluhetnic_pesanan_jahit)


    return(
        <div>
            <Navbar/>
            <div className="container mx-auto flex justify-start items-center gap-2">
                <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
                <FiChevronRight/>
                <p className="font-semibold">Profil</p>
            </div>

            <div className="container mx-auto mt-14">
              <h2 className="text-primary text-4xl lg:text-6xl font-bold">PESANAN SAYA</h2>
                <div className="">
                    <div className="grid lg:grid-cols-2 gap-10 mt-5">
                        <div className="">
                            <h4 className="font-semibold text-lg uppercase text-secondary">Pembelian Pakaian</h4>
                            <div className="h-64 border rounded-md p-3">
                                {dataPesanan?.sekargaluhetnic_pesanan_pakaian?.slice(0, 2).map((el) => <PesananItem key={el.id} items={el} /> )}
                                <div className="flex ml-auto mr-0 items-center gap-1 w-fit cursor-pointer">
                                    <p className="text-right text-secondary"><u><Link to="/pesanan-pakaian">Lihat semua</Link></u></p>
                                    <FiChevronRight/>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <h4 className="font-semibold uppercase text-lg text-secondary">Pemesanan Jahit Pakaian</h4>
                            <div className="h-64 border rounded-md p-3">
                                {dataPesananJahit?.sekargaluhetnic_pesanan_jahit?.slice(0, 2).map((el) => 
                                <PesananJahitItem key={el.id} items={el}/>
                                )}
                                <div className="flex ml-auto mr-0 items-center gap-1 w-fit cursor-pointer">
                                    <p className="text-right text-secondary"><u><Link to="/pesanan-jahit">Lihat semua</Link></u></p>
                                    <FiChevronRight/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <br></br>
              <h2 className="text-primary text-4xl lg:text-6xl font-bold">PROFIL</h2>
              <div className="grid lg:grid-cols-12 mt-4">
                <div className={`col-span-3 `}>
                    <MenuProfil/>
                </div>
                <div className="col-span-9">
                    <div className="border rounded-md p-5">
                        <h5 className="mb-3 font-semibold uppercase">Profil</h5>
                        <h6 className="font-medium">Alamat Email</h6>
                        <p className="mb-2">{data?.email}</p>
                        <h6 className="font-medium">Nama</h6>
                        <p className="mb-2">{data?.name}</p>
                        <h6 className="font-medium">No. Telefon</h6>
                        <p className="mb-2">{data?.telephone}</p>
                        <h6 className="font-medium">Jenis Kelamin</h6>
                        <p className="mb-2">{data?.jenis_kelamin}</p>
                    </div>
                </div>
              </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile