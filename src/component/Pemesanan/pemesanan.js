
import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { v1 } from "uuid";

import KeranjangItem from "../Keranjang/keranjangItem"
import ListItem from "../Katalog/ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Pemesanan.module.css"

import { GetKeranjangKatalog, GetSumKeranjang } from "../../graphql/query"
import { GetAnotherKatalog } from "../../graphql/query"
import useGetKeranjangKatalog from "../../hooks/useGetKeranjangKatalog"
import useInsertToCart from "../../hooks/useInsertToCart"
import useInsertToPemesanan from "../../hooks/useInsertToPemesanan"
import { SubscriptionKeranjangKatalog } from "../../graphql/subscription"
import { SubscriptionSumKeranjang } from "../../graphql/subscription"
import { InsertPemesananPakaian } from "../../graphql/mutation";

import { AiOutlineRight } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { borderTop } from "@mui/system"


import { GetUserProfileData } from "../../graphql/query";
import Cookies from "js-cookie";

const getPesananPakaianID = gql `
query MyQuery($_eq: String!) {
  sekargaluhetnic_pesanan_pakaian(where: {pesanan_session: {_eq: $_eq}}) {
    id
  }
}
`;

const Pemesanan = () => {

  const navigate = useNavigate()

  const {data: dataID, loading: loadingID, error: errorID} = useQuery(getPesananPakaianID, {variables: { _eq: Cookies.get("pesanan-session")}})

  // console.log("cek id", dataID?.sekargaluhetnic_pesanan_pakaian[0].id)

  const {data, loading, error} = useQuery(GetKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye") }})

  const {data: dataSubs, loading: loadingSubs, error:errorSubs} = useSubscription(SubscriptionKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye")}})

  const {data: dataTotalProduk, loading: loadingTdataTotalProduk, error: errorTdataTotalProduk} = useSubscription(SubscriptionSumKeranjang, {variables: {_eq: Cookies.get("okogaye")}})
  const taxProduk = (11/100) * (dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga)
  
  const {data: dataUser, loading: loadingUser, error: errorUser} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})
  const dataAlamat = dataUser?.sekargaluhetnic_user[0].alamats[0];
  // console.log(dataAlamat)

  const LoggedIn = Cookies.get("token")

  const mappingPesanan = dataSubs?.sekargaluhetnic_katalog?.map(function(el) {
    return {
      katalog_id: el.id,
      pesanan_pakaian_id: dataID?.sekargaluhetnic_pesanan_pakaian[0]?.id
    }
  }) 
  console.log("coba mapping", mappingPesanan)
  

  const [ongkir, setOngkir] = useState(0)
  const [opsiPengiriman, setOpsiPengiriman] = useState('')
  // const [tot, setTot] = useState(v1())


  let totalHarga = dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga + parseInt(ongkir)

  console.log("cek di state", totalHarga)

  // const handleChangePengiriman = (e) => {
  //   setOpsiPengiriman(e.target.value)
  // }
  
  useEffect(() => { 
    if (dataAlamat?.provinsi == "DKI Jakarta") {
      if (opsiPengiriman == "reguler") {
        setOngkir(9000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(15000)
      }
    }
    
  }, [opsiPengiriman])
  
  console.log("opsi", opsiPengiriman)
  console.log("cek ongkir" ,ongkir)
  
  const {insertPemesananPakaian, loadingInsertPemesananPakaian} = useInsertToPemesanan()
  const pesan = () => {
    if(LoggedIn) {
      insertPemesananPakaian({
        variables: {
          objects: mappingPesanan
        }
      })
      Cookies.remove("pesanan-session")
      // navigate("/profil")
    } else {
      navigate("/login")
    }
  }


    return (
        <div>
          <Navbar/>
          <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
            <Link className="me-1" to="/katalog">Katalog</Link>
            <FiChevronRight/>
            <p className="ms-1">Keranjang</p>
          </div>

          <div className={`container mt-4 ${style.pemesanan}`}>
            <h2>PEMESANAN DAN PEMBAYARAN</h2>
            <div className="row mt-5">
              <div className={`col-md-8`}>
                <div className={style.pemesananPembayaran}>
                  <div className={style.alamatPengiriman}>
                    <h5>ALAMAT PENGIRIMAN</h5>
                    {(dataAlamat ? 
                    <p>{dataAlamat?.alamat}, {dataAlamat?.kelurahan}, {dataAlamat?.kecamatan}, {dataAlamat?.kabupaten_kota}, {dataAlamat?.provinsi}, {dataAlamat?.negara}, {dataAlamat?.kodepos}</p> :
                    <p>Belum ada alamat</p>
                    )}
                  </div>
                  <div className={style.opsiPengiriman}>
                    <h5>OPSI PENGIRIMAN</h5>
                    <h6>Pemberitahuan</h6>
                    <p>Dalam opsi pengiriman tidak terdapat pilihan kurir, kurir yang kami gunakan adalah kurir yang sudah bermitra dengan kami. Hanya terdapat pilihan kelas pengiriman yang berpengaruh kepada waktu sampai barang.</p>
                    <div className={style.pilihanPengiriman}>
                      <input type="radio" id="age1" name="age" value="reguler" onChange={() => setOpsiPengiriman("reguler")}/>
                      <label for="age1">Reguler</label><br/>
                      <p for="age1">JABODETABEK: 1-3 hari kerja, Pulau Jawa: 2-11 hari kerja, Luar Pulau Jawa: 4-14 hari kerja</p>
                      <input type="radio" id="age2" name="age" value="cepat" onChange={() => setOpsiPengiriman("cepat")}/>
                      <label for="age2">Cepat</label><br/>
                      <p for="age1">JABODETABEK: NEXTDAY, Pulau Jawa: 2-5 hari kerja, Luar Pulau Jawa: 4-8 hari kerja</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-4">
                <div className={style.keranjangPembayaran}>
                  <div className={style.hargaKeranjang}>
                    <h5>RINGKASAN PESANAN | {data?.sekargaluhetnic_katalog?.length} PRODUK</h5>
                    <div className="d-flex justify-content-between">
                      <p>Subtotal produk</p>
                      <p>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga.toLocaleString()}</p>
                    </div>
                    <div className="d-flex justify-content-between mb-n1">
                      <h6 className="text-uppercase">Subtotal</h6>
                      <h6>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga.toLocaleString()}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="">Termasuk pajak</p>
                      <p>Rp{taxProduk.toLocaleString()}</p>
                    </div>
                    <div className="d-flex justify-content-between mt-n3">
                      <p className="">Ongkir</p>
                      <p>Rp{ongkir.toLocaleString()}</p>
                    </div>
                    <div className="d-flex justify-content-between mb-n1">
                      <h6 className="text-uppercase">total</h6>
                      <h6>Rp{totalHarga}</h6>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5>PRODUK YANG DIPESAN</h5>
                    <div className={style.katalogPemesanan}>
                      {dataSubs?.sekargaluhetnic_katalog?.map((katalog) => 
                        <div className="row mb-2">
                          <div className="col-4 ">
                            <img className="" src={katalog?.foto}></img>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                            <h6 className="ms-3">{katalog.nama}</h6>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <button onClick={pesan} className="w-100 rounded-1 p-2 border border-0">BUAT PESANAN</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
      </div>
    )

}

export default Pemesanan