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
      value: "kemeja-pendek"
    },
    {
      id: 2,
      nama: "Kemeja Lengan Panjang",
      foto: "foto",
      value: "kemeja-panjang"
    },
    {
      id: 3,
      nama: "Gaun",
      foto: "foto",
      value: "gaun"
    },
    {
      id: 4,
      nama: "Blouse",
      foto: "foto",
      value: "blouse"
    },
    {
      id: 5,
      nama: "Rok",
      foto: "foto",
      value: "rok"
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
  const [uploadImageUrl, setUploadImageUrl] = useState([
    {
      foto: [],
      pesanan_jahit_id: dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.id,
      user_id: Cookies.get("okogaye")
    }
  ])

  const {data, loading, error} = useQuery(GetKain)
  // console.log(data)

  const handleSelectJenisPakaian = (value) => {
   setPilihJenisPakaian(value)
  }
  const handleSelectKain = (value) => {
    setPilihKain(value)
  }
  const handleChangeUkuranTubuh = (e) => {
    setUkuranTubuh({
      ...ukuranTubuh,
      [e.target.name]: e.target.value
    })
  }
  console.log(ukuranTubuh.panjang_lengan)
  console.log(ukuranTubuh.ukuran_leher)
  console.log(pilihJenisPakaian)
  console.log(pilihKain)

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
          <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
            <Link className="me-1" to="/">SekarGaluhEtnic</Link>
            <FiChevronRight/>
            <Link to="/jahit"><p className="ms-1">Jahit</p></Link>
            <FiChevronRight className="ms-1"/>
            <p className="ms-1">Jahit Online</p>
          </div>

          <div className={`container mt-4 ${style.jahit}`}>
            <h2 className="mb-5">JAHIT ONLINE</h2>
            <div className={`mb-5 ${style.jahitOnline}`}>

              <div className={style.pilihJenisPakaian}>
                <h6>Pilih Jenis Pakaian</h6>
                <p className="mb-0 font-weight-normal">Berikut adalah beberapa jenis pakaian yang dapat kami jahit, pilih salah satu</p>
                <div className="d-flex justify-content-around flex-wrap">
                  {jenisPakaian.map(question => (
                    <Question active={question === activeQuestion}>
                      <div onClick={() => {
                        setActiveQuestioin(question);
                        handleSelectJenisPakaian(question.nama)
                      }} 
                        className={style.jenisPakaian}
                        >
                        <p className="clicked">{question.nama}</p>
                      </div>
                    </Question>
                  ))}
                </div>
              </div>

              <div className={`mb-4 ${style.pilihKain}`}>
                <h6>Pilih Kain</h6>
                <p className="mb-3 font-weight-normal">Berikut adalah kain yang tersedia pada toko kami. Jika Anda ingin memakai kain sendiri, klik tombol "Menggunakan Kain Sendiri", dimana pengiriman kain ditanggung oleh Anda.</p>
                <div className={`d-flex justify-content-between flex-wrap ${style.mappingKain}`}>
                {data?.sekargaluhetnic_kain?.map((kain) => 
                  <div>
                    <img src={kain.foto} onClick={() => handleSelectKain(kain.nama)}></img>
                  </div>
                )}
                </div>
              </div>

              <div className={style.inputUkuranTubuh}>
                <h6>Masukkan Ukuran Tubuh</h6>
                <p>Input ukuran tubuh Anda ke dalam form yang sudah kami sediakan, kami menyediakan panduan pengukuran tubuh. Isi dengan angka dengan satuan centimeter (cm)</p>
                <div className={style.ukuranTubuh}>
                  <div className="mb-3">
                    <table>
                        <tbody>
                            <tr>
                              <td>Ukuran Leher</td>
                              <td><input 
                                name="ukuran_leher" 
                                type="text" 
                                placeholder="ukuran leher"
                                onChange={handleChangeUkuranTubuh}
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td>Panjang Lengan</td>
                              <td><input 
                                name="panjang_lengan" 
                                type="text" 
                                placeholder="panjang lengan" 
                                onChange={handleChangeUkuranTubuh}
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

              <div className={style.unggahDesain}>
                <h6>Unggah Desain</h6>
                <p>Unggah gambaran desain yang kamu miliki, bisa menggunakan gambaran sketsa, ataupun produk pakaian yang sudah jadi untuk sebagai contoh penjahitan. Diharapkan mengunggah gambar yang jelas, dari berbagai sisi, dengan penerangan yang baik, agar memudahkan kami dalam proses menjahit</p>
                <div>
                  <input 
                    type="file"
                    id="upload_file" 
                    onChange={(event) => {
                      getImagePreview(event);
                      setImageUpload(event.target.files[0]);
                    }}
                  >
                  </input>
                  <div id="preview" className={style.previewImage}></div>
                  <div className="mt-4 d-flex justify-content-end">
                    <button className={style.uploadImage} onClick={uploadFile}>Unggah Gambar</button>
                  </div>
                  <h6>Foto yang sudah terunggah</h6>
                  <div className={style.uploadedImage}>
                    {imageUrls.map((url) => {
                      return <img src={url} />;
                    })}
                  </div>
                </div>
              </div>

              <button onClick={handleUploadPesanan} className={style.buatPesananButton}>Buat Pesanan</button>
              
            </div>
          </div>
          <Footer />
      </div>
  )
}

export default JahitOnline