import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate, Link} from "react-router-dom"


import { FiChevronRight } from "react-icons/fi"

import { gql, useLazyQuery, useQuery, useMutation } from "@apollo/client";

import { GetUserProfileData } from "../../graphql/query";
import { InsertAlamat } from "../../graphql/mutation";
import { UpdateAlamat } from "../../graphql/mutation";
import { UpdateProfil } from "../../graphql/mutation";

import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function SuntingProfil() {

  const navigate = useNavigate()
  
  const {data: dataUser, loading, error} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})
  console.log("cek data profil", dataUser)

  const [updateProfil, {loading: loadingUpdateProfil}] = useMutation(UpdateProfil)

  const [profil, setProfil] = useState({
    name: dataUser?.sekargaluhetnic_user[0].name,
    email: dataUser?.sekargaluhetnic_user[0].email,
    jenis_kelamin: dataUser?.sekargaluhetnic_user[0].jenis_kelamin,
    telephone: dataUser?.sekargaluhetnic_user[0].telephone
  })

  const handleChangeUpdateProfil = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProfil({
      ...profil,
      [name]: value,
    })
  }

  const handleUpdateProfil = () => {
    updateProfil({
      variables: {
        _eq: Cookies.get("okogaye"),
        name: profil.name,
        email: profil.email,
        jenis_kelamin: profil.jenis_kelamin,
        telephone: profil.telephone,
      }
    })
    toast.success("Data Berhasil Diubah")
    setTimeout(() => {
      navigate("/profil")
      window.location.reload(false);
    }, 2000);
  }

  return (
    <div>
      <Navbar/>
      <ToastContainer />
        <div className="container mx-auto flex justify-start items-center gap-2">
          <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
          <FiChevronRight/>
          <Link className="" to="/profil"><p>Profil</p></Link>
          <FiChevronRight/>
          <p className="font-semibold">Sunting Profil</p>
        </div>

        <div className="container mx-auto mt-14">
          <h2 className="uppercase text-4xl lg:text-6xl font-bold text-primary">Sunting Profil</h2>

          <div className="border rounded-md p-5 mt-5">
              <div>
                <div> 
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Nama</h6>
                    <input name="name" onChange={handleChangeUpdateProfil} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Nama" value={profil.name}></input>
                  </div>
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Email</h6>
                    <input name="email" onChange={handleChangeUpdateProfil} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Email" value={profil.email}></input>
                  </div>
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Jenis Kelamin</h6>
                    <input name="jenis_kelamin" onChange={handleChangeUpdateProfil} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Jenis Kelamin" value={profil.jenis_kelamin}></input>
                  </div>
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Telephone</h6>
                    <input name="telephone" onChange={handleChangeUpdateProfil} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Telephone" value={profil.telephone}></input>
                  </div>

                  
                  <div className="mt-10 flex justify-center">
                    <button className="bg-secondary text-white px-20 py-2 text-lg font-medium rounded-md border border-secondary hover:bg-white hover:text-secondary duration-200" onClick={handleUpdateProfil}>UBAH</button>
                  </div>
                </div> 
              </div>
            
          </div>

        </div>
        <Footer/>
    </div>
  )
}
