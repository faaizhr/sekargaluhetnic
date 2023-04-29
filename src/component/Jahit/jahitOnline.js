import { Link } from "react-router-dom" 
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import Cookies from "js-cookie";

import { GetKain } from "../../graphql/query";
import { GetPesananID } from "../../graphql/query";
import { UpdateJahitBaju } from "../../graphql/mutation";
import { InsertFotoDesainJahit } from "../../graphql/mutation";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from './Jahit.module.css'
import styled from "@emotion/styled";

import { FiChevronRight } from "react-icons/fi"
import { useMutation, useQuery } from "@apollo/client";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

  const Question = styled.div`
    margin: 1rem 0;

    .clicked {
      color: ${p => (p.active ? "#3F4E4F" : "#A7A7A7")};
      border: ${p => (p.active ? "3px solid #3F4E4F" : "1px solid #dddddd")};
      font-weight: ${p => (p.active ? "600" : "400")};
      border-radius: 5px;
      width: 100%;
      height: 100%;
      padding: 5px;
    }
  `;
  
  const jenisPakaian = [
    {
      id: 1,
      nama: "Kemeja Lengan Pendek",
      foto: "foto",
      value: "kemeja-pendek",
      harga: 150000
    },
    {
      id: 2,
      nama: "Kemeja Lengan Panjang",
      foto: "foto",
      value: "kemeja-panjang",
      harga: 190000
    },
    {
      id: 3,
      nama: "Gaun / Terusan",
      foto: "foto",
      value: "gaun",
      harga: 240000
    },
  ];

function JahitOnline() {

  const [activeQuestion, setActiveQuestioin] = useState();

  // UPLOAD IMAGE ===================================

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, `uploadPesanan/${Cookies.get("okogaye")}/${Cookies.get("jahit-session")}/`);
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `uploadPesanan/${Cookies.get("okogaye")}/${Cookies.get("jahit-session")}/${imageUpload.name + v4()}`);
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

  const {data: dataPesanan, loading: LoadingPesanan, error: errorPesanan} = useQuery(GetPesananID, {variables: {_eq: Cookies.get("jahit-session")}})
  const [updatePesanan, {loading: loadngUpdatePesanan}] = useMutation(UpdateJahitBaju);
  const [insertFotoDesain, {loading: loadingInsertFotoDesain}] = useMutation(InsertFotoDesainJahit)

  const [pilihJenisPakaian, setPilihJenisPakaian] = useState("")
  const [pilihKain, setPilihKain] = useState("")
  const [ukuranTubuh, setUkuranTubuh] = useState({
    panjang_lengan: "",
    ukuran_leher: ""
  })
  const [value, setValue] = useState('');
  const [hargaJenisPakaian, setHargaJenisPakaian] = useState(0)
  const [hargaKain, setHargaKain] = useState(0)
  const [totalBiaya, setTotalBiaya] = useState(hargaKain + hargaJenisPakaian)
  const [deskripsi, setDeskripsi] = useState('');
  const [uploadImageUrl, setUploadImageUrl] = useState([
    {
      foto: [],
      pesanan_jahit_id: dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.id,
      user_id: Cookies.get("okogaye")
    }
  ])

  const {data, loading, error} = useQuery(GetKain)
  // console.log(data)

  console.log("cek deskripsi", deskripsi)

  const handleSelectJenisPakaian = (value) => {
   setPilihJenisPakaian(value.nama)
   setHargaJenisPakaian(value.harga)
  //  setTotalBiaya(hargaJenisPakaian + hargaKain)
  }
  
  const handleSelectKain = (value) => {
    setPilihKain(value.nama)
    setHargaKain(value.harga)
    // setTotalBiaya(hargaJenisPakaian + hargaKain)
  }

  useEffect(() => {
    setTotalBiaya(hargaJenisPakaian + hargaKain)
  }, [hargaJenisPakaian + hargaKain]);

  // setTotalBiaya(hargaKain + hargaJenisPakaian)

  console.log("cek harga", totalBiaya)

  const handleChangeUkuranTubuh = (e) => {
    setUkuranTubuh({
      ...ukuranTubuh,
      [e.target.name]: e.target.value
    })
  }
  // console.log(ukuranTubuh.panjang_lengan)
  // console.log(ukuranTubuh.ukuran_leher)
  // console.log(pilihJenisPakaian)
  // console.log(pilihKain)

  const mappingImage = imageUrls.map(function(el) {
    return {
      foto: el,
      pesanan_jahit_id: dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.id,
      user_id: Cookies.get("okogaye")
    }
  }) 
  console.log("coba mapping", mappingImage)
  
  const handleUploadPesanan = () => {
      updatePesanan({
        variables: {
          _eq: Cookies.get("jahit-session"),
          jenis_pakaian: pilihJenisPakaian,
          kain: pilihKain,
          panjang_lengan: ukuranTubuh.panjang_lengan,
          ukuran_leher: ukuranTubuh.ukuran_leher
        }
      })

      insertFotoDesain({
        variables: {
          objects: mappingImage
        }
      })

      Cookies.remove("jahit-session")
  }


  return(
      <div>
          <Navbar/>
          <div className="container mx-auto flex justify-start items-center gap-2">
                <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
                <FiChevronRight/>
                <Link className="" to="/jahit"><p>Jahit</p></Link>
                <FiChevronRight/>
                <p className="font-semibold">Jahit Online</p>
            </div>

          <div className={`container mt-4 mx-auto`}>
            <h2 className="mb-5 text-primary text-6xl font-bold">JAHIT ONLINE</h2>
            <div className={`mb-5 border rounded-md p-5`}>

              <div className="">
                <h6 className="font-semibold text-lg text-primary">Pilih Jenis Pakaian</h6>
                <p className="">Berikut adalah beberapa jenis pakaian yang dapat kami jahit, pilih salah satu</p>
                <div className="flex justify-start gap-5 flex-wrap">
                  {jenisPakaian.map(question => (
                    <Question active={question === activeQuestion}>
                      <div onClick={() => {
                        setActiveQuestioin(question);
                        handleSelectJenisPakaian(question)
                      }} 
                        className=""
                        >
                        <p className="clicked">{question.nama}</p>
                      </div>
                    </Question>
                  ))}
                </div>
              </div>

              <div className={`mb-4`}>
                <h6 className="font-semibold text-lg text-primary">Pilih Kain</h6>
                <p className="mb-3 font-weight-normal">Berikut adalah kain yang tersedia pada toko kami. Saat ini Anda hanya dapat menjahit dari kain yang disediakan oleh kami.</p>
                <div className={`flex justify-start gap-5 flex-wrap border p-3 rounded-md`}>
                {data?.sekargaluhetnic_kain?.map((kain) => 
                  <div className={pilihKain == kain.nama ? "border-4 border-secondary rounded-md shadow-md" : "border-white border-4"}>
                    <img className="w-40 h-40 object-cover" src={kain.foto} onClick={() => handleSelectKain(kain)}></img>
                  </div>
                )}
                </div>
              </div>

              <div className="">
                <h6 className="font-semibold text-lg text-primary">Masukkan Ukuran Tubuh</h6>
                <p>Input ukuran tubuh Anda ke dalam form yang sudah kami sediakan, kami menyediakan panduan pengukuran tubuh. Isi dengan angka dengan satuan centimeter (cm)</p>
                <div className="">
                  <div className="mb-3">
                    <table>
                        <tbody>
                            <tr>
                              <td className="text-sm font-medium">Ukuran Leher</td>
                              <td><input 
                                name="ukuran_leher" 
                                type="text" 
                                placeholder="ukuran leher"
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-sm font-medium">Panjang Lengan</td>
                              <td><input 
                                name="panjang_lengan" 
                                type="text" 
                                placeholder="panjang lengan" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-sm font-medium">Panjang Lengan (Bagian Belakang)</td>
                              <td><input 
                                name="panjang_lengan_belakang" 
                                type="text" 
                                placeholder="panjang lengan bagian belakang" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-sm font-medium">Pinggang</td>
                              <td><input 
                                name="pinggang" 
                                type="text" 
                                placeholder="pinggang" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-sm font-medium">Lebar Bahu</td>
                              <td><input 
                                name="lebar_bahu" 
                                type="text" 
                                placeholder="lebar bahu" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-sm font-medium">Panggul</td>
                              <td><input 
                                name="panggul" 
                                type="text" 
                                placeholder="panggul" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            {/* <tr>
                              <td>Pinggang</td>
                              <td><input type="text" placeholder="pinggang"></input></td>
                            </tr>
                            <tr>
                              <td>Panjang Lengan (bagian belakang)</td>
                              <td><input type="text" placeholder="panjang lengan"></input></td>
                            </tr>
                            <tr>
                              <td>Lebar Bahu</td>
                              <td><input type="text" placeholder="lebar bahu"></input></td>
                            </tr>
                            <tr>
                              <td>Panggul</td>
                              <td><input type="text" placeholder="panggul"></input></td>
                            </tr> */}
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>

              <div className="">
                <h6 className="font-semibold text-lg text-primary mt-10">Unggah Desain</h6>
                <p>Unggah gambaran desain yang kamu miliki, bisa menggunakan gambaran sketsa, ataupun produk pakaian yang sudah jadi untuk sebagai contoh penjahitan. Diharapkan mengunggah gambar yang jelas, dari berbagai sisi, dengan penerangan yang baik, agar memudahkan kami dalam proses menjahit</p>
                <div>
                  <input 
                    type="file"
                    id="upload_file" 
                    onChange={(event) => {
                      getImagePreview(event);
                      setImageUpload(event.target.files[0]);
                    }}
                    className="text-sm mt-2"
                  >
                  </input>
                  <div id="preview" className="border rounded-md p-3 flex justify-start flex-wrap gap-5 mt-2"></div>
                  <div className="mt-4 d-flex justify-content-end">
                    <button className="bg-secondary2 px-5 py-2 text-white text-sm rounded-md border border-secondary2 hover:bg-white hover:text-secondary2 duration-200" onClick={uploadFile}>Unggah Gambar</button>
                  </div>
                  <h6 className="font-semibold text-lg text-primary mt-10">Foto yang sudah terunggah</h6>
                  <div className="border rounded-md p-3 flex justify-start flex-wrap gap-5">
                    {imageUrls.map((url) => {
                      return <img className="w-40 h-40 object-cover" src={url} />;
                    })}
                  </div>
                </div>
              </div>

              <div>
                <h6 className="font-semibold text-lg text-primary mt-10">Deskripsi Desain</h6>
                <p>Deskripsikan desain pakaian yang diinginkan sesuai dengan gambar yang sudah diunggah untuk memudahkan penjahit dalam menjahit pakaiannya.</p>
                <ReactQuill theme="snow" value={deskripsi} onChange={setDeskripsi} className="mt-2" />
              </div>

              <div>
                <h6 className="font-semibold text-lg text-primary mt-10">Total Biaya</h6>
                <p>Biaya menyesuaikan dengan jenis pakaian yang dijahit dan kain yang digunakan</p>
                <p className="text-base font-semibold mt-2 text-secondary">Rp{totalBiaya}</p>
              </div>

              <button onClick={handleUploadPesanan} className={style.buatPesananButton}>Buat Pesanan</button>
              
            </div>
          </div>
          <Footer />
      </div>
  )
}

export default JahitOnline