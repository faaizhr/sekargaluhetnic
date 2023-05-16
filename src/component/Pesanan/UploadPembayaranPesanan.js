import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";


import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import { FiChevronRight } from "react-icons/fi"

import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


import Chat from "../Chat/chat";
import Cookies from "js-cookie"

export default function UploadPembayaranPesanan() {

    // UPLOAD IMAGE ===================================

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
  
    // const imagesListRef = ref(storage, `uploadPesanan/${Cookies.get("okogaye")}/${Cookies.get("jahit-session")}/`);
    const imagesListRef = ref(storage, `uploadBuktiBayar3`);
    const uploadFile = () => {
      if (imageUpload == null) return;
      // const imageRef = ref(storage, `uploadPesanan/${Cookies.get("okogaye")}/${Cookies.get("jahit-session")}/${imageUpload.name + v4()}`);
      const imageRef = ref(storage, `uploadBuktiBayar3`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });

    };
  
    useEffect(() => {
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      });
  
    }, []);
  
    
    // setTotalBiaya(hargaKain + hargaJenisPakaian)
    // console.log("cek url", imageUrls )
  
    // ==================================================
    // IMAGE PREVIEW ====================================
  
    const getImagePreview = (event) => 
    {
      var image=URL.createObjectURL(event.target.files[0]);
      var imagediv= document.getElementById('preview');
      var newimg=document.createElement('img');
      imagediv.innerHTML='';
      newimg.src=image;
      // newimg.width="150";
      imagediv.appendChild(newimg);
    }
  
    // ==================================================


  return (
    <div>
      <div className="bg-white w-[650px] mx-auto mt-40 p-5 rounded-md border shadow-sm h-[600px] overflow-scroll">
        <h6 className="text-center text-2xl font-semibold text-secondary">Upload Bukti Pembayaran</h6>
        <div className="border-b border-secondary pb-3">
          <p className="text-base mt-5">Berikut adalah beberapa panduan untuk mengupload bukti pembayaran</p>
          <ul className="list-disc ml-6 grid gap-2 mt-5">
            <li>Anda dapat melakukan pembayaran dengan menggunakan transfer bank ataupun melalui transfer e-wallet.</li>
            <li>Terdapat beberapa No. Rekening ataupun No. Tujuan pembayaran seperti yang dilampirkan di bawah sesuai metode pembayaran yang Anda gunakan.</li>
            <li>Isi form pembayaran dengan lengkap.</li>
            <li>Upload bukti pembayaran yang jelas.</li>
          </ul>
        </div>
        <div className="mt-3">
          <form className="grid gap-3">
            <div>
              <p className="text-base">Nama Rekening Pemilik</p>
              <input type="text" className="border-b w-full hover:border-primary focus:border-primary focus:outline-none p-1" placeholder="Nama Rekening Pemilik"></input>
            </div>
            <div>
              <p className="text-base">Metode Pembayaran</p>
              <select className="w-full mt-2 border-b p-1">
                <option>Transfer Bank</option>
                <option>Gopay</option>
                <option>Ovo</option>
                <option>Dana</option>
              </select>
            </div>
            <div>
              <p className="text-base">Upload Bukti Bayar</p>
              <input 
                type="file" 
                id="upload_file" 
                onChange={(event) => {
                  getImagePreview(event);
                  setImageUpload(event.target.files[0]);
                }}
                className="my-2">
              </input>
              <div id="preview" className="border rounded-md p-3 flex justify-start flex-wrap gap-5 mt-2"></div>
              <div className="mt-4 flex justify-end">
                <button className="bg-secondary2 px-5 py-2 text-white text-sm rounded-md border border-secondary2 hover:bg-white hover:text-secondary2 duration-200" onClick={uploadFile}>Unggah Gambar</button>
              </div>
              <h6 className="text-base font-medium text-primary mt-5">Foto yang sudah terunggah</h6>
              <div className="border rounded-md p-3 flex justify-start flex-wrap gap-5">
                {imageUrls.map((url) => {
                  return <img className="w-40 h-40 object-cover" src={url} />;
                })}
              </div>
            </div>

            <div>
              <button className="bg-secondary w-full py-3 text-white texl-xl font-medium rounded-md border border-secondary hover:bg-white hover:text-secondary duration-200 tracking-wide">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
