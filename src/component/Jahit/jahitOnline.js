import { Link, useNavigate } from "react-router-dom" 
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
import Modal from '@mui/material/Modal';

import { GetKain, CountPesananJahit } from "../../graphql/query";
import { GetPesananID } from "../../graphql/query";
import { UpdateJahitBaju } from "../../graphql/mutation";
import { InsertFotoDesainJahit } from "../../graphql/mutation";
import { GetUserProfileData } from "../../graphql/query";

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

  const navigate = useNavigate();

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
  const {data: userData, loading: userLoading} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye")}})
  console.log("cek user", userData)

  const [ongkir, setOngkir] = useState(0)
  const [opsiPengiriman, setOpsiPengiriman] = useState('')

  const [pilihJenisPakaian, setPilihJenisPakaian] = useState("")
  const [pilihKain, setPilihKain] = useState("")
  const [ukuranTubuh, setUkuranTubuh] = useState({})
  const [value, setValue] = useState('');
  const [hargaJenisPakaian, setHargaJenisPakaian] = useState(0)
  const [hargaKain, setHargaKain] = useState(0)
  const [totalBiaya, setTotalBiaya] = useState(hargaKain + hargaJenisPakaian + ongkir)
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
    setTotalBiaya(hargaJenisPakaian + hargaKain + ongkir)
  }, [hargaJenisPakaian + hargaKain + ongkir]);

  // setTotalBiaya(hargaKain + hargaJenisPakaian)

  console.log("cek harga", totalBiaya)

  const handleChangeUkuranTubuh = (e) => {
    setUkuranTubuh({
      ...ukuranTubuh,
      [e.target.name]: e.target.value
    })
  }
  console.log(ukuranTubuh)
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
  console.log("imageurls", imageUrls)

  var date = new Date()
  var day = ("0" + date.getDate()).slice(-2)
  var month = ("0" + date.getMonth()).slice(-2)
  var year = date.getFullYear()
  
  var fulltime = year + month + day
  console.log("cek bulan", fulltime)

  const {data: dataCountPesanan} = useQuery(CountPesananJahit)
  const [kodePemesanan, setKodePemesanan] = useState()

  useEffect(() => {
    setKodePemesanan("PJHT" + "/" + fulltime + "/" + (dataCountPesanan?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count + 1))
  
  }, [fulltime + dataCountPesanan?.sekargaluhetnic_pesanan_jahit_aggregate.aggregate.count])

  console.log("cek count jahit", kodePemesanan)
  
  const handleUploadPesanan = () => {
      updatePesanan({
        variables: {
          _eq: Cookies.get("jahit-session"),
          jenis_pakaian: pilihJenisPakaian,
          kain: pilihKain,
          lebar_bahu: ukuranTubuh.lebar_bahu,
          lingkar_dada: ukuranTubuh.lingkar_dada,
          lingkar_leher: ukuranTubuh.lingkar_leher,
          lingkar_pinggul: ukuranTubuh.lingkar_pinggul,
          lingkar_pinggang: ukuranTubuh.lingkar_pinggang,
          lingkar_kerung_lengan: ukuranTubuh.lingkar_kerung_lengan,
          lingkar_pergelangan_tangan: ukuranTubuh.lingkar_pergelangan_tangan,
          panjang_baju: ukuranTubuh.panjang_baju,
          panjang_lengan: ukuranTubuh.panjang_lengan,
          ongkir: ongkir,
          opsi_pengiriman: opsiPengiriman,
          kode_pemesanan: kodePemesanan,
          deskripsi: deskripsi,
          updated_at: Date(),
          created_at: Date(),
          total_biaya: totalBiaya,
          status: "Menunggu Pembayaran"
        }
      })

      insertFotoDesain({
        variables: {
          objects: mappingImage
        }
      })

      Cookies.remove("jahit-session")
      setTimeout(() => {
        navigate("/profil")
      }, 2000);
  }

  useEffect(() => { 
    if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Nanggroe Aceh Darussalam") {
      if (opsiPengiriman == "reguler") {
        setOngkir(54000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(63000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Sumatera Utara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(47000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(53000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Sumatera Selatan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(23000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(46000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Sumatera Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(38000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(49000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Bengkulu") {
      if (opsiPengiriman == "reguler") {
        setOngkir(34000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(39000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Riau") {
      if (opsiPengiriman == "reguler") {
        setOngkir(38000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(49000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Kepulauan Riau") {
      if (opsiPengiriman == "reguler") {
        setOngkir(47000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(55000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Jambi") {
      if (opsiPengiriman == "reguler") {
        setOngkir(25000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(29000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Lampung") {
      if (opsiPengiriman == "reguler") {
        setOngkir(20000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(38000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Bangka Belitung") {
      if (opsiPengiriman == "reguler") {
        setOngkir(29000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(48000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Kalimantan Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(47000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(60000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Kalimantan Timur") {
      if (opsiPengiriman == "reguler") {
        setOngkir(59000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(69000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Kalimantan Selatan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(45000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(52000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Kalimantan Tengah") {
      if (opsiPengiriman == "reguler") {
        setOngkir(45000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(52000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Kalimantan Utara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(77000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(90000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Banten") {
      if (opsiPengiriman == "reguler") {
        setOngkir(12000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(24000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "DKI Jakarta") {
      if (opsiPengiriman == "reguler") {
        setOngkir(10000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(18000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Jawa Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(12000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(24000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Jawa Tengah") {
      if (opsiPengiriman == "reguler") {
        setOngkir(19000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(35000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Daerah Istimewa Yogyakarta") {
      if (opsiPengiriman == "reguler") {
        setOngkir(19000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(35000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Jawa Timur") {
      if (opsiPengiriman == "reguler") {
        setOngkir(20000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(37000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Bali") {
      if (opsiPengiriman == "reguler") {
        setOngkir(30000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(50000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Nusa Tenggara Timur") {
      if (opsiPengiriman == "reguler") {
        setOngkir(74000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(86000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Nusa Tenggara Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(46000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(60000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Gorontalo") {
      if (opsiPengiriman == "reguler") {
        setOngkir(73000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(85000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Sulawesi Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(55000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(64000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Sulawesi Tengah") {
      if (opsiPengiriman == "reguler") {
        setOngkir(73000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(85000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Sulawesi Utara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(67000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(78000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Sulawesi Tenggara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(73000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(85000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Sulawesi Selatan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(56000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(75000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Maluku Utara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(89000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(104000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Maluku ") {
      if (opsiPengiriman == "reguler") {
        setOngkir(89000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(104000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Papua Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(139000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(163000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Papua") {
      if (opsiPengiriman == "reguler") {
        setOngkir(117000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(137000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Papua Tengah") {
      if (opsiPengiriman == "reguler") {
        setOngkir(134000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(157000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Papua Pegunungan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(134000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(157000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Papua Selatan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(166000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(195000)
      }
    } else if (userData?.sekargaluhetnic_user[0].alamats[0].provinsi == "Papua Barat Daya") {
      if (opsiPengiriman == "reguler") {
        setOngkir(122000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(143000)
      }
    } 
    
  }, [opsiPengiriman])
  
  console.log("opsi", opsiPengiriman)
  console.log("cek ongkir" ,ongkir)

  // MODAL
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                <h6 onClick={handleOpen} className="my-2 uppercase font-medium underline cursor-pointer w-fit hover:">Paduan Pengukuran</h6>
                <div className="">
                  <div className="mb-3">
                    <table>
                        <tbody>
                            <tr>
                              <td className="text-sm font-medium">Panjang Baju</td>
                              <td><input 
                                name="panjang_baju" 
                                type="text" 
                                placeholder="panjang baju"
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
                              <td className="text-sm font-medium">Lingkar Leher</td>
                              <td><input 
                                name="lingkar_leher" 
                                type="text" 
                                placeholder="lingkar leher" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-sm font-medium">Lingkar Dada</td>
                              <td><input 
                                name="lingkar_dada" 
                                type="text" 
                                placeholder="lingkar dada" 
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
                              <td className="text-sm font-medium">Lingkar Pinggul</td>
                              <td><input 
                                name="lingkar_pinggul" 
                                type="text" 
                                placeholder="lingkar pinggul" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-sm font-medium">Lingkar Pinggang</td>
                              <td><input 
                                name="lingkar_pinggang" 
                                type="text" 
                                placeholder="lingkar pinggang" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-sm font-medium">Lingkar Pergelangan Tangan</td>
                              <td><input 
                                name="lingkar_pergelangan_tangan" 
                                type="text" 
                                placeholder="lingkar pergelangan tangan" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-sm font-medium">Lingkar Kerung Lengan</td>
                              <td><input 
                                name="lingkar_kerung_lengan" 
                                type="text" 
                                placeholder="lingkar kerung lengan" 
                                onChange={handleChangeUkuranTubuh}
                                className="ml-10 text-sm border-b p-1 focus:outline-none focus:border-b-primary"
                              >
                                </input>
                              </td>
                            </tr>
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
                <h6 className="font-semibold text-lg text-primary mt-10">Alamat Pengiriman</h6>
                <p>{userData?.sekargaluhetnic_user[0].alamats[0].alamat}, {userData?.sekargaluhetnic_user[0].alamats[0].kelurahan}, {userData?.sekargaluhetnic_user[0].alamats[0].kecamatan}, {userData?.sekargaluhetnic_user[0].alamats[0].kabupaten_kota}, {userData?.sekargaluhetnic_user[0].alamats[0].provinsi}, {userData?.sekargaluhetnic_user[0].alamats[0].negara}, {userData?.sekargaluhetnic_user[0].alamats[0].kodepos}.</p>
              </div>

              <div>
                <h6 className="font-semibold text-lg text-primary mt-10">Opsi Pengiriman</h6>
                <p className="font-medium">Pemberitahuan</p>
                    <p className="mb-3">Dalam opsi pengiriman tidak terdapat pilihan kurir, kurir yang kami gunakan adalah kurir yang sudah bermitra dengan kami. Hanya terdapat pilihan kelas pengiriman yang berpengaruh kepada waktu sampai barang.</p>
                    <div>
                      <input type="radio" id="age1" name="age" value="reguler" onChange={() => setOpsiPengiriman("reguler")}/>
                      <label className="ml-2 text-sm" for="age1">Reguler</label><br/>
                      <p for="age1">JABODETABEK: 1-3 hari kerja, Pulau Jawa: 2-11 hari kerja, Luar Pulau Jawa: 4-14 hari kerja</p>
                      <input type="radio" id="age2" name="age" value="cepat" onChange={() => setOpsiPengiriman("cepat")}/>
                      <label className="ml-2 text-sm" for="age2">Cepat</label><br/>
                      <p for="age1">JABODETABEK: NEXTDAY, Pulau Jawa: 2-5 hari kerja, Luar Pulau Jawa: 4-8 hari kerja</p>
                    </div>
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

          <Modal
          open={open}
          onClose={handleClose}
          className="focus:outline-none"
        >
          <div className="bg-white w-4/5 mx-auto mt-24 p-4 rounded-md focus:outline-none h-[800px] overflow-scroll">
            <h6 className="text-center uppercase text-xl font-semibold text-secondary tracking-wider">Panduan Pengukuran Tubuh</h6>
            <div>
              <img className="mx-auto w-[1000px]" src="https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Asset%2FGroup%20144.png?alt=media&token=0d4b15a9-289c-4f90-86fc-cf8560d39f60"></img>
              <img className="mx-auto w-[1000px]" src="https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Asset%2FGroup%20145.png?alt=media&token=26a389d8-65c6-41cf-a1c2-1a3ad5d7a5d6"></img>
            </div>
          </div>
        </Modal>
      </div>
  )
}

export default JahitOnline