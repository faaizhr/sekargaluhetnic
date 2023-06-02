import { gql, useLazyQuery, useQuery, useSubscription, useMutation } from "@apollo/client"
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

// import ListItem from "./ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Pesanan.module.css"
import ChatJahit from "../Chat/chatJahit";
import LoadingSvg from "../Loading/LoadingSvg";

import { GetAnotherKatalog } from "../../graphql/query"
import useInsertToCart from "../../hooks/useInsertToCart"
import { GetUserProfileData } from "../../graphql/query";
import { GetPesananJahitDetail } from "../../graphql/query";
import { UploadPembayaranPesananJahit } from "../../graphql/mutation";
import { HandleStatusPesananJahit } from "../../graphql/mutation";
import { InsertReturBarang } from "../../graphql/mutation";

import { AiOutlineRight } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi"
import Modal from '@mui/material/Modal';

import Cookies from "js-cookie";

const PesananJahitDetail = () => {

  const location = useLocation()
  const { id } = location.state
  console.log("cek state", location.state)
  const navigate = useNavigate()

  const {data, loading, error} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye")}})
  const dataUser = data?.sekargaluhetnic_user[0];
  const {data: dataPesanan, loading: LoadingPesanan, error: errorPesanan} = useQuery(GetPesananJahitDetail, {variables: { _eq: location.state.id}})
  console.log("cek data pesanan", dataPesanan)

  const [uploadPembayaran, {loading: loadingUploadPembayaran}] = useMutation(UploadPembayaranPesananJahit)


  const [chatModal, setChatModal] = useState(false);

  const popUpModal = () => {
    if (chatModal == false) {
      setChatModal(true)
    } else if (chatModal == true) {
      setChatModal(false)
    }
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    // HANDLE RETUR BARANG MODAL =========================
    const [openRetur, setOpenRetur] = useState(false);
    const handleOpenRetur = () => setOpenRetur(true);
    const handleCloseRetur = () => setOpenRetur(false);
  
    // ================================================

  const [values, setValues] = useState({})

  const handleChangePembayaran = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  console.log("cek value", values)

    // UPLOAD IMAGE ===================================

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState("");
  
    const imagesListRef = ref(storage, `uploadBuktiBayar/pesananJahit/${Cookies.get("okogaye")}/${location.state.id}/`);
    // const imagesListRef = ref(storage, `uploadBuktiBayar/`);
    const uploadFile = () => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `uploadBuktiBayar/pesananJahit/${Cookies.get("okogaye")}/${location.state.id}/${v4()}`);
      // const imageRef = ref(storage, `uploadBuktiBayar`);
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
  
    console.log("cek url", imageUrls )
  
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


  
    // HANDLE PEMBAYARAN ================================
    const handleUpdatePembayaran = () => {
      uploadPembayaran({
        variables: {
          _eq: location.state.id,
          bukti_pembayaran: imageUrls[0],
          nama_rekening_pemilik: values.nama_rekening_pemilik,
          metode_pembayaran: values.metode_pembayaran,
        }
      })
      window.location.reload(false);
      // setImageUrls("")
    }
    // ===================================================

    // HANDLE CANCEL PESANAN =============================
    
    const [cancelPesanan, {loading: loadingCancelPesanan}] = useMutation(HandleStatusPesananJahit)

    const handleCancelPesanan = () => {
      cancelPesanan({
        variables: {
          _eq: location.state.id,
          status: "Dibatalkan"
        }
      })
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
    }

    // ===================================================
    // SELESAIKAN PESANAN ===============================

  const [selesaikanPesanan, {loading: loadingSelesaikanPesanan}] =useMutation(HandleStatusPesananJahit)

  const handleSelesaikanPesanan = () => {
    selesaikanPesanan({
      variables: {
        _eq: location.state.id,
        status: "Pesanan Selesai"
      }
    })
    setTimeout(() => {
      window.location.reload(false);
    }, 1500);

  }

  // ===================================================

    // RETUR BARANG ======================================

    const [returValues, setReturValues] = useState({})

    const handleChangeReturBarang = (e) => {
      setReturValues({
        ...returValues,
        [e.target.name]: e.target.value
      })
    }
    console.log("cek alasan", returValues)
  
    const [returBarang, {loading: loadingReturBarang}] = useMutation(InsertReturBarang)
  
    const handleSubmitReturBarang = () => {
      returBarang({
        variables: {
          objects: {
            alasan: returValues.alasan,
            pesanan_jahit_id: location.state.id,
            user_id: Cookies.get("okogaye"),
            status: "Menunggu Konfirmasi"
          }
        }
      })
      // setTimeout(() => {
      //   window.location.reload(false);
      // }, 1500);
    }
  
  
    // ===================================================

    

  return(
    <div>
      <Navbar/>
      <div className="container mx-auto flex justify-start items-center gap-2">
        <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
        <FiChevronRight/>
        <Link className="" to="/pesanan-jahit"><p>Riwayat Pesanan Jahit</p></Link>
        <FiChevronRight/>
        <p className="font-semibold">{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].kode_pemesanan}</p>
      </div>

      <div className={`container mx-auto mt-14`}>
            <h2 className="text-primary text-4xl lg:text-6xl font-bold uppercase">Detail Pesanan</h2>
            <div className="my-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="col-span-8">
                <div>
                  <h6 className="font-medium">Jenis Pakaian</h6>
                  <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].jenis_pakaian}</p>
                </div>
                <div className="mt-3">
                  <h6 className="font-medium">Kain</h6>
                  <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].kain}</p>
                </div>
                <div className="mt-3">
                  <h6 className="font-medium">Ukuran Tubuh</h6>
                  <div className="border p-3 rounded-md">
                    <p>Panjang Baju : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].panjang_baju} cm</p>
                    <p>Panjang Lengan : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].panjang_lengan} cm</p>
                    <p>Lebar Bahu : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lebar_bahu} cm</p>
                    <p>Lingkar Dada : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_dada} cm</p>
                    <p>Lingkar Kerung Lengan : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_kerung_lengan} cm</p>
                    <p>Lingkar Pergelangan Tangan : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_pergelangan_tangan} cm</p>
                    <p>Lingkar Pinggang : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_pinggang} cm</p>
                    <p>Lingkar Pinggul : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_pinggul} cm</p>
                    <p>Lingkar Leher : {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].lingkar_leher} cm</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h6 className="font-medium">Foto Desain</h6>
                  <div className="border p-3 rounded-md flex gap-3 flex-wrap">
                    {dataPesanan?.sekargaluhetnic_pesanan_jahit[0].foto_desains.map((el) => 
                    <div>
                      <a href={el.foto} target="_blank">
                        <img className="w-40 h-40 object-cover"  src={el.foto}></img>
                      </a>
                    </div>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <h6 className="font-medium">Deskripsi Desain</h6>
                  <div className="border p-3 rounded-md">
                    <div className="text-sm list-disc" dangerouslySetInnerHTML={{__html: dataPesanan?.sekargaluhetnic_pesanan_jahit[0].deskripsi}}></div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4 col-span-8">
                <h6 className="font-medium text-base">Alamat Pengiriman</h6>
                <p>{dataUser?.alamats[0].alamat}, {dataUser?.alamats[0].kelurahan}, {dataUser?.alamats[0].kecamatan}, {dataUser?.alamats[0].kabupaten_kota}, {dataUser?.alamats[0].provinsi}, {dataUser?.alamats[0].negara}, {dataUser?.alamats[0].kodepos}</p>
                <h6 className="font-medium text-base mt-3">Biaya Ongkos Kirim</h6>
                <p>Rp{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].ongkir}</p>
                <h6 className="font-medium text-base mt-3">Total Biaya</h6>
                <p>Rp{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].total_biaya}</p>
                <h6 className="font-medium text-base mt-3">Status</h6>
                <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status}</p>
                <h6 className="font-medium text-base mt-3">Waktu Pemesanan</h6>
                <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].created_at}</p>
                <h6 className="font-medium text-base mt-3">Kode Pemesanan</h6>
                <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0].kode_pemesanan}</p>

                { dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status == "Dibatalkan" ? 
                  ""
                  :
                  <div>
                    <h6 className="font-medium text-base mt-5">Pembayaran</h6>
                    { dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.metode_pembayaran ? 
                    <div>
                      <p><span className="font-medium">Nama Rekening Pemilik : </span> {dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.nama_rekening_pemilik}</p>
                      <p className="capitalize"><span className="font-medium">Metode Pembayaran : </span> {dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.metode_pembayaran}</p>
                      <p className="font-medium">Bukti Pembayaran : </p>
                      <div className="border rounded-md p-2 w-fit">
                        <img className="w-80" src={dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.bukti_pembayaran}></img>
                      </div>
                    </div> :
                    <p>Anda <u>belum melakukan pembayaran</u>, harap segera upload bukti bayar. Terima Kasih</p>
                    }
                  </div>
                }

                { dataPesanan?.sekargaluhetnic_pesanan_jahit[0].status == "Dibatalkan" ?
                  <p className="bg-red-500 text-center text-white py-3 rounded-md mt-10">Pesanan Dibatalkan</p>
                  :
                  <div>
                    <button className="bg-secondary text-white w-full rounded-md py-2 mt-5 border border-secondary hover:bg-white hover:text-secondary duration-200" onClick={popUpModal}>Chat</button>
                    { dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.status != "Menunggu Pembayaran" ? 
                    ""
                    :
                    <button className="bg-secondary2 text-white w-full rounded-md py-2 mt-2 border border-secondary2 hover:bg-white hover:text-secondary duration-200" onClick={handleOpen}>Upload Bukti Pembayaran</button>
                    }
                    { dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.status == "Menunggu Pembayaran" ? 
                      <button className="bg-red-500 text-white w-full rounded-md py-2 mt-2 border border-red-500 hover:bg-white hover:text-secondary duration-200" onClick={handleCancelPesanan}>Batalkan Pesanan</button> : ""
                    }
                    { dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.status == "Pesanan Diantar" ? 
                      <div>
                        <button className="bg-secondary2 text-white w-full rounded-md py-2 mt-2 border border-secondary2 hover:bg-white hover:text-secondary duration-200" onClick={handleSelesaikanPesanan}>Selesaikan Pesanan</button> 
                      </div>
                      : ""
                    }
                    { dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.status == "Pesanan Selesai" ? 
                      <div className="mt-4">
                        <p>Pesanan tidak sesuai? <span onClick={handleOpenRetur} className="font-medium underline">Ajukan retur barang</span></p>
                      </div>
                      : ""
                    }
                  </div>
                }


                <div className={ chatModal ? 'block': 'hidden' }>
                  <div className="w-[400px] fixed bottom-5 right-5 bg-white border shadow px-1 py-2 rounded-md">
                    <ChatJahit id={location.state.id} popUp={popUpModal} chatModal={chatModal}/>
                  </div>
                </div>
              </div>

              {/* MODAL UPLOAD PEMBAYARAN */}

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
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
                    <div className="grid gap-3">
                      <div>
                        <p className="text-base">Nama Rekening Pemilik</p>
                        <input type="text" className="border-b w-full hover:border-primary focus:border-primary focus:outline-none p-1" placeholder="Nama Rekening Pemilik" name="nama_rekening_pemilik" onChange={handleChangePembayaran}></input>
                      </div>
                      <div>
                        <p className="text-base">Metode Pembayaran</p>
                        <select name="metode_pembayaran" onChange={handleChangePembayaran} className="w-full mt-2 border-b p-1">
                          <option value="transfer_bank">Transfer Bank</option>
                          <option value="gopay">Gopay</option>
                          <option value="ovo">Ovo</option>
                          <option value="dana">Dana</option>
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
                        <h6 className="font-semibold text-lg text-primary mt-10">Foto yang sudah terunggah</h6>
                        <div className="border rounded-md p-3 flex justify-start flex-wrap gap-5">
                          {imageUrls ? 
                          <img className="w-40 h-40 object-cover" src={imageUrls} /> : ""
                          }
                        </div>

                      </div>

                      <div>
                        <button className="bg-secondary w-full py-3 text-white texl-xl font-medium rounded-md border border-secondary hover:bg-white hover:text-secondary duration-200 tracking-wide" onClick={() => {handleUpdatePembayaran()}}>
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              {/* MODAL RETUR BARANG */}
              <Modal
                open={openRetur}
                onClose={handleCloseRetur}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className="bg-white w-[650px] mx-auto mt-40 p-5 rounded-md border shadow-sm h-[600px] overflow-scroll">
                  <h6 className="text-center text-2xl font-semibold text-secondary">Ajukan Retur Produk</h6>
                  <div className="border-b border-secondary pb-3">
                    <p className="text-base my-5">Terdapat syarat yang harus dipenuhi untuk dapat mengembalikan produk. Berikut syarat - syarat pengembalian produk</p>
                    <ul className="list-disc text-sm ml-5">
                      <li className="mb-2">Periode dalam pengembalian produk melalui pembelian online hanya berlaku maksimum 30 (tiga puluh) hari sejak tanggal pembelian.</li>
                      <li className="mb-2">Syarat pengembalian produk melalui pembelian online adalah dalam kondisi baru, belum digunakan, dan belum pernah dicuci</li>
                      <li className="mb-2">Jumlah dana yang dikembalikan berdasarkan pada jumlah yang telah Anda bayar</li>
                      <li className="mb-2">Kami berhak untuk menolak pengembalian jika produk tidak memenuhi persyaratan kebijakan pengembalian di atas.</li>
                      <li className="mb-2">Kami berhak mengubah kebijakan ini setiap saat tanpa pemberitahuan.</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <div className="grid gap-3">
                      <div>
                        <h5 className="font-medium">Retur Produk Jahit</h5>
                        <h6>Produk yang ingin diretur</h6>
                        <div className="mt-3 grid gap-1 pb-5 border-b border-secondary">
                          <div>
                            <h6 className="text-sm font-medium">Kode Pemesanan</h6>
                            <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.kode_pemesanan}aSAD798ASH</p>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium">Jenis Pakaian</h6>
                            <p>{dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.jenis_pakaian}</p>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium">Harga</h6>
                            <p>Rp{dataPesanan?.sekargaluhetnic_pesanan_jahit[0]?.total_biaya.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-base">Alasan Retur Produk</p>
                        <input type="text" className="border-b w-full hover:border-primary focus:border-primary focus:outline-none p-1" placeholder="Alasan Retur Produk" name="alasan" onChange={handleChangeReturBarang}></input>
                      </div>

                      <div className="mt-5">
                        <button className="bg-secondary w-full py-2 text-white texl-lg font-medium rounded-md border border-secondary hover:bg-white hover:text-secondary duration-200 tracking-wide" onClick={() => {handleSubmitReturBarang()}}>{ loadingReturBarang ? <LoadingSvg/> : "Ajukan Retur" }</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

            </div>
          </div>
          <Footer />
    </div>
  )
}

export default PesananJahitDetail