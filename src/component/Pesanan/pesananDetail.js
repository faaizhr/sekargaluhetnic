
import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client"
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

import { UploadPembayaranPesananPakaian } from "../../graphql/mutation";
import { GetPesananPakaianDetail } from "../../graphql/query";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import { FiChevronRight } from "react-icons/fi"

import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


import Chat from "../Chat/chat";
import Cookies from "js-cookie"

const SubscriptionChat = gql `
subscription MySubscription($_eq: Int!) {
  sekargaluhetnic_chat(where: {pesanan_pakaian_id: {_eq: $_eq}}) {
    id
    message
    pesanan_pakaian_id
    user_id
  }
}
`;


const PesananDetail = () => {
  
  const location = useLocation()
  // const { id } = location.state
  // console.log("cek state", location.state)
  const navigate = useNavigate()

  const {data: dataChat, loading: loadingChat, error:errorChat} = useSubscription(SubscriptionChat, {variables: { _eq: location.state.id}})
  const {data: dataPesanan, loading: loadingPesanan, error: errorPesanan} = useQuery(GetPesananPakaianDetail, {variables: {_eq: location.state.id}})
  console.log("cek pesanan detail", dataPesanan)

  const [uploadPembayaran, {loading: loadingUploadPembayaran}] = useMutation(UploadPembayaranPesananPakaian)

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

  const imagesListRef = ref(storage, `uploadBuktiBayar/pesananPakaian/${Cookies.get("okogaye")}/${location.state.id}/`);
  // const imagesListRef = ref(storage, `uploadBuktiBayar/`);
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `uploadBuktiBayar/pesananPakaian/${Cookies.get("okogaye")}/${location.state.id}/${v4()}`);
    // const imageRef = ref(storage, `uploadBuktiBayar`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });

    // setTimeout(() => {
    //   uploadPembayaran({
    //     variables: {
    //       _eq: location.state.id,
    //       bukti_pembayaran: imageUrls,
    //       nama_rekening_pemilik: values.nama_rekening_pemilik,
    //       metode_pembayaran: values.metode_pembayaran,
    //     }
    //   })
    // }, 1500);
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

    return (
        <div className="detailPesanan">
          <Navbar/>
          <div className="container mx-auto flex justify-start items-center gap-2">
            <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
            <FiChevronRight/>
            <Link className="" to="/riwayat-pesanan"><p>Riwayat Pesanan</p></Link>
            <FiChevronRight/>
            <p className="font-semibold">Profil</p>
          </div>

          <div className={`container mx-auto mt-14`}>
            <h2 className="text-primary text-4xl lg:text-6xl font-bold uppercase">Detail Pesanan</h2>
            <div className="my-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="col-span-8">
                {dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.pesanans.map((pesanan) => 
                  <div className="grid grid-cols-5 mb-5 gap-10 border-b pb-5">
                    <div className="col-span-2">
                      <img className="w-56 h-72 object-cover rounded-md" src={pesanan.katalog.foto} />
                    </div>
                    <div className="col-span-3">
                      <p className="font-medium text-lg text-primary">{pesanan.katalog.nama}</p>
                      <p>{pesanan.katalog.deskripsi}</p>
                      <p className="font-semibold text-lg text-primary mt-3">Rp{pesanan.katalog.harga.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-4 col-span-8">
                <h6 className="font-medium text-base">Alamat Pengiriman</h6>
                <p>{dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.user.alamats[0].alamat}, {dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.user.alamats[0].kelurahan}, {dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.user.alamats[0].kecamatan}, {dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.user.alamats[0].kabupaten_kota}, {dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.user.alamats[0].provinsi}, {dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.user.alamats[0].negara}, {dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.user.alamats[0].kodepos}</p>
                <h6 className="font-medium text-base mt-3">Biaya Ongkos Kirim</h6>
                <p>Rp{dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.ongkir}</p>
                <h6 className="font-medium text-base mt-3">Total Biaya</h6>
                <p>Rp{dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.total_harga}</p>
                <h6 className="font-medium text-base mt-3">Status</h6>
                <p>{dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.status}</p>
                <h6 className="font-medium text-base mt-3">Waktu Pemesanan</h6>
                <p>{dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.created_at}</p>
                <h6 className="font-medium text-base mt-3">Kode Pemesanan</h6>
                <p>{dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.created_at}</p>

                <h6 className="font-medium text-base mt-5">Pembayaran</h6>
                { dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.metode_pembayaran ? 
                <div>
                  <p><span className="font-medium">Nama Rekening Pemilik : </span> {dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.nama_rekening_pemilik}</p>
                  <p className="capitalize"><span className="font-medium">Metode Pembayaran : </span> {dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.metode_pembayaran}</p>
                  <p className="font-medium">Bukti Pembayaran : </p>
                  <img className="w-80" src={dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.bukti_pembayaran}></img>
                </div> :
                <p>Anda <u>belum melakukan pembayaran</u>, harap segera upload bukti bayar. Terima Kasih</p>
                }

                <button className="bg-secondary text-white w-full rounded-md py-2 mt-5 border border-secondary hover:bg-white hover:text-secondary duration-200" onClick={popUpModal}>Chat</button>
                { dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.status != "Menunggu Pembayaran" ? 
                <button className="bg-secondary3 text-white w-full rounded-md py-2 mt-2 border border-secondary3 cursor-default">{dataPesanan?.sekargaluhetnic_pesanan_pakaian[0]?.status}</button> 
                :
                <button className="bg-secondary2 text-white w-full rounded-md py-2 mt-2 border border-secondary2 hover:bg-white hover:text-secondary duration-200" onClick={handleOpen}>Upload Bukti Pembayaran</button>
                
                }


                <div className={ chatModal ? 'block': 'hidden' }>
                  <div className="w-[400px] fixed bottom-5 right-5 bg-white border shadow px-1 py-2 rounded-md">
                    <Chat id={location.state.id} popUp={popUpModal} chatModal={chatModal}/>
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

            </div>
          </div>
          <Footer />
      </div>
    )

}

export default PesananDetail