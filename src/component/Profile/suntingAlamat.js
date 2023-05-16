import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate, Link} from "react-router-dom"


import { FiChevronRight } from "react-icons/fi"

import { gql, useLazyQuery, useQuery, useMutation } from "@apollo/client";

import { GetUserProfileData } from "../../graphql/query";
import { InsertAlamat } from "../../graphql/mutation";
import { UpdateAlamat } from "../../graphql/mutation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function SuntingAlamat() {

  const navigate = useNavigate();

  const {data: dataUser, loading, error} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})
  const dataAlamat = dataUser?.sekargaluhetnic_user[0].alamats[0];
  console.log("alamat", dataAlamat)

  const [insertAlamat, {loading: loadingInsertAalamat}] = useMutation(InsertAlamat)
  const [updateAlamat, {loading: loadingUpdateAlamat}] = useMutation(UpdateAlamat)


  const [alamat, setAlamat] = useState({
    negara: "Indonesia",
    provinsi: "",
    kabupatenkota: "",
    kecamatan: "",
    kelurahan: "",
    detailalamat: "",
    kodepos: ""
  })

  const [editAlamat, setEditAlamat] = useState({
    negara: "Indonesia",
    provinsi: dataAlamat?.provinsi,
    kabupatenkota: dataAlamat?.kabupaten_kota,
    kecamatan: dataAlamat?.kecamatan,
    kelurahan: dataAlamat?.kelurahan,
    detailalamat: dataAlamat?.alamat,
    kodepos: dataAlamat?.kodepos
  })

  console.log("cek alamat", editAlamat)

  const handleChangeInsertAlamat = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setAlamat({
      ...alamat,
      [name]: value,
    })
  }
  const handleChangeUpdateAlamat = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setEditAlamat({
      ...editAlamat,
      [name]: value,
    })
  }

  const handleInsertAlamat = () => {
    insertAlamat({
      variables: {
        objects: {
          negara: alamat.negara,
          provinsi: alamat.provinsi,
          kabupaten_kota: alamat.kabupatenkota,
          kecamatan: alamat.kecamatan,
          kelurahan: alamat.kelurahan,
          alamat: alamat.detailalamat,
          kodepos: alamat.kodepos,
          user_id: Cookies.get("okogaye")
       }
      }
    })
  }

  const handleUpdateAlamat = () => {
    updateAlamat({
      variables: {
        _eq: Cookies.get("okogaye"),
        _set: {
          negara: editAlamat.negara,
          provinsi: editAlamat.provinsi,
          kabupaten_kota: editAlamat.kabupatenkota,
          kecamatan: editAlamat.kecamatan,
          kelurahan: editAlamat.kelurahan,
          alamat: editAlamat.detailalamat,
          kodepos: editAlamat.kodepos 
        }
      }
    })
    toast.success("Data Berhasil Diubah")
    setTimeout(() => {
      navigate("/alamat")
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
          <Link className="" to="/alamat"><p>Alamat</p></Link>
          <FiChevronRight/>
          <p className="font-semibold">Sunting Alamat</p>
        </div>

        <div className="container mx-auto mt-14">
          <h2 className="uppercase text-4xl lg:text-6xl font-bold text-primary">Sunting Alamat</h2>

          <div className="border rounded-md p-5 mt-5">
            {(!dataAlamat ?
              <div> 
                <div>
                  <h6 className="font-medium">Negara</h6>
                  <p className="mb-2">Indonesia</p>
                </div>
                <div className="mt-1 mb-3">
                  <h6 className="font-medium">Provinsi</h6>
                  <div className="border px-3 py-1 text-sm rounded-md w-fit mt-1">
                    <select className="focus:outline-none" name="provinsi" onChange={handleChangeInsertAlamat}>
                      <option value="Nanggroe Aceh Darussalam">Nanggroe Aceh Darussalam</option>
                      <option value="Sumatera Utara">Sumatera Utara</option>
                      <option value="Sumatera Selatan">Sumatera Selatan</option>
                      <option value="Sumatera Barat">Sumatera Barat</option>
                      <option value="Bengkulu">Bengkulu</option>
                      <option value="Riau">Riau</option>
                      <option value="Kepulauan Riau">Kepulauan Riau</option>
                      <option value="Jambi">Jambi</option>
                      <option value="Lampung">Lampung</option>
                      <option value="Bangka Belitung">Bangka Belitung</option>
                      <option value="Kalimantan Barat">Kalimantan Barat</option>
                      <option value="Kalimantan Timur">Kalimantan Timur</option>
                      <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                      <option value="Kalimantan Tengah">Kalimantan Tengah</option>
                      <option value="Kalimantan Utara">Kalimantan Utara</option>
                      <option value="Banten">Banten</option>
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                      <option value="Daerah Istimewa Yogyakarta">Daerah Istimewa Yogyakarta</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Bali">Bali</option>
                      <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
                      <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
                      <option value="Gorontalo">Gorontalo</option>
                      <option value="Sulawesi Barat">Sulawesi Barat</option>
                      <option value="Sulawesi Tengah">Sulawesi Tengah</option>
                      <option value="Sulawesi Utara">Sulawesi Utara</option>
                      <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
                      <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                      <option value="Maluku Utara">Maluku Utara</option>
                      <option value="Maluku">Maluku</option>
                      <option value="Papua Barat">Papua Barat</option>
                      <option value="Papua">Papua</option>
                      <option value="Papua Tengah">Papua Tengah</option>
                      <option value="Papua Pegunungan">Papua Pegunungan</option>
                      <option value="Papua Selatan">Papua Selatan</option>
                      <option value="Papua Barat Daya">Papua Barat Daya</option>
                    </select>
                  </div>
                </div>
                <div className="mt-1 mb-3">
                  <h6 className="font-medium">Kabupaten / Kota</h6>
                  <input name="kabupatenkota" onChange={handleChangeInsertAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Kabupaten / Kota"></input>
                </div>
                <div className="mt-1 mb-3">
                  <h6 className="font-medium">Kecamatan</h6>
                  <input name="kecamatan" onChange={handleChangeInsertAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Kecamatan"></input>
                </div>
                <div className="mt-1 mb-3">
                  <h6 className="font-medium">Kelurahan</h6>
                  <input name="kelurahan" onChange={handleChangeInsertAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Kelurahan"></input>
                </div>
                <div className="mt-1 mb-3">
                  <h6 className="font-medium">Detail Alamat</h6>
                  <input name="detailalamat" onChange={handleChangeInsertAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Nama Jalan / Perumahan / RT / RW"></input>
                </div>
                <div className="mt-1 mb-3">
                  <h6 className="font-medium">Kode Pos</h6>
                  <input name="kodepos" onChange={handleChangeInsertAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Kode Pos"></input>
                </div>
                
                <div className="mt-10 flex justify-center">
                  <button onClick={handleInsertAlamat} className="bg-secondary text-white px-20 py-2 text-lg font-medium rounded-md border border-secondary hover:bg-white hover:text-secondary duration-200">SIMPAN</button>
                </div>
              </div> 
              :
              <div>
                <div> 
                  <div>
                    <h6 className="font-medium">Negara</h6>
                    <p className="mb-2">Indonesia</p>
                  </div>
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Provinsi</h6>
                    <div className="border px-3 py-1 text-sm rounded-md w-fit mt-1">
                      <select className="focus:outline-none" name="provinsi" onChange={handleChangeUpdateAlamat} value={editAlamat?.provinsi}>
                        <option value="Nanggroe Aceh Darussalam">Nanggroe Aceh Darussalam</option>
                        <option value="Sumatera Utara">Sumatera Utara</option>
                        <option value="Sumatera Selatan">Sumatera Selatan</option>
                        <option value="Sumatera Barat">Sumatera Barat</option>
                        <option value="Bengkulu">Bengkulu</option>
                        <option value="Riau">Riau</option>
                        <option value="Kepulauan Riau">Kepulauan Riau</option>
                        <option value="Jambi">Jambi</option>
                        <option value="Lampung">Lampung</option>
                        <option value="Bangka Belitung">Bangka Belitung</option>
                        <option value="Kalimantan Barat">Kalimantan Barat</option>
                        <option value="Kalimantan Timur">Kalimantan Timur</option>
                        <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                        <option value="Kalimantan Tengah">Kalimantan Tengah</option>
                        <option value="Kalimantan Utara">Kalimantan Utara</option>
                        <option value="Banten">Banten</option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                        <option value="Jawa Tengah">Jawa Tengah</option>
                        <option value="Daerah Istimewa Yogyakarta">Daerah Istimewa Yogyakarta</option>
                        <option value="Jawa Timur">Jawa Timur</option>
                        <option value="Bali">Bali</option>
                        <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
                        <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
                        <option value="Gorontalo">Gorontalo</option>
                        <option value="Sulawesi Barat">Sulawesi Barat</option>
                        <option value="Sulawesi Tengah">Sulawesi Tengah</option>
                        <option value="Sulawesi Utara">Sulawesi Utara</option>
                        <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
                        <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                        <option value="Maluku Utara">Maluku Utara</option>
                        <option value="Maluku">Maluku</option>
                        <option value="Papua Barat">Papua Barat</option>
                        <option value="Papua">Papua</option>
                        <option value="Papua Tengah">Papua Tengah</option>
                        <option value="Papua Pegunungan">Papua Pegunungan</option>
                        <option value="Papua Selatan">Papua Selatan</option>
                        <option value="Papua Barat Daya">Papua Barat Daya</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Kabupaten / Kota</h6>
                    <input name="kabupatenkota" onChange={handleChangeUpdateAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Kabupaten / Kota" value={editAlamat?.kabupatenkota}></input>
                  </div>
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Kecamatan</h6>
                    <input name="kecamatan" onChange={handleChangeUpdateAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Kecamatan" value={editAlamat?.kecamatan}></input>
                  </div>
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Kelurahan</h6>
                    <input name="kelurahan" onChange={handleChangeUpdateAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Kelurahan" value={editAlamat?.kelurahan}></input>
                  </div>
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Detail Alamat</h6>
                    <input name="detailalamat" onChange={handleChangeUpdateAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Nama Jalan / Perumahan / RT / RW" value={editAlamat?.detailalamat}></input>
                  </div>
                  <div className="mt-1 mb-3">
                    <h6 className="font-medium">Kode Pos</h6>
                    <input name="kodepos" onChange={handleChangeUpdateAlamat} className="border-b w-full focus:outline-none focus:border-primary text-sm p-1" placeholder="Kode Pos" value={editAlamat?.kodepos}></input>
                  </div>
                  
                  <div className="mt-10 flex justify-center">
                    <button className="bg-secondary text-white px-20 py-2 text-lg font-medium rounded-md border border-secondary hover:bg-white hover:text-secondary duration-200" onClick={handleUpdateAlamat}>UBAH</button>
                  </div>
                </div> 
              </div>
            )}
          </div>

        </div>
        <Footer/>
    </div>
  )
}
