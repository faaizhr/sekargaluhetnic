
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
import { UpdatePemesananPakaian } from "../../graphql/mutation";

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
  const {data: dataUser, loading: loadingUser, error: errorUser} = useQuery(GetUserProfileData, {variables: { _eq: Cookies.get("okogaye") }})

  const taxProduk = (11/100) * (dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga)
  const dataAlamat = dataUser?.sekargaluhetnic_user[0].alamats[0];
  const LoggedIn = Cookies.get("token")

  // console.log("cek waktu", Date())

  const mappingPesanan = dataSubs?.sekargaluhetnic_katalog?.map(function(el) {
    return {
      katalog_id: el.id,
      pesanan_pakaian_id: dataID?.sekargaluhetnic_pesanan_pakaian[0]?.id,
      created_at: Date()
    }
  }) 
  console.log("coba mapping", mappingPesanan)
  

  const [ongkir, setOngkir] = useState(0)
  const [opsiPengiriman, setOpsiPengiriman] = useState('')
  let totalHarga = dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga + parseInt(ongkir)

  
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

  
  const [updatePemesananPakaian, {loading: loadingUpdatePemesananPakaian}] = useMutation(UpdatePemesananPakaian)
  const {insertPemesananPakaian, loadingInsertPemesananPakaian} = useInsertToPemesanan()
  const pesan = () => {
    if(LoggedIn) {
      if(ongkir == 0) {
        toast.error("Pilih Opsi Pengiriman")
      } else {
        insertPemesananPakaian({
          variables: {
            objects: mappingPesanan
          }
        })
        Cookies.remove("pesanan-session")

        updatePemesananPakaian({
          variables: {
            id: dataID?.sekargaluhetnic_pesanan_pakaian[0]?.id,
            ongkir: ongkir,
            total_harga: totalHarga,
            created_at: Date()
          }
        })
      }
      // navigate("/profil")
    } else {
      navigate("/login")
    }
  }


    return (
        <div>
          <Navbar/>
          <ToastContainer />
          <div className="container mx-auto flex justify-start items-center gap-2">
                <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
                <FiChevronRight/>
                <Link to="/keranjang" className=""><p>Keranjang</p></Link>
                <FiChevronRight/>
                <p className="font-semibold">Pemesanan</p>
            </div>

          <div className="container mt-4 mx-auto">
            <h2 className="text-primary text-4xl lg:text-6xl font-bold">PEMESANAN DAN PEMBAYARAN</h2>
            <div className="grid lg:grid-cols-12 mt-5 gap-10">
              <div className={`col-span-8`}>
                <div className="border p-5 rounded-md">
                  <div className="border-b pb-4">
                    <h5 className="uppercase text-lg font-semibold text-secondary">ALAMAT PENGIRIMAN</h5>
                    {(dataAlamat ? 
                    <p>{dataAlamat?.alamat}, {dataAlamat?.kelurahan}, {dataAlamat?.kecamatan}, {dataAlamat?.kabupaten_kota}, {dataAlamat?.provinsi}, {dataAlamat?.negara}, {dataAlamat?.kodepos}</p> :
                    <p>Belum ada alamat</p>
                    )}
                  </div>
                  <div className="mt-5">
                    <h5 className="uppercase text-lg font-semibold text-secondary">OPSI PENGIRIMAN</h5>
                    <h6 className="font-medium">Pemberitahuan</h6>
                    <p className="mb-3">Dalam opsi pengiriman tidak terdapat pilihan kurir, kurir yang kami gunakan adalah kurir yang sudah bermitra dengan kami. Hanya terdapat pilihan kelas pengiriman yang berpengaruh kepada waktu sampai barang.</p>
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
              <div className="col-span-8 lg:col-span-4 mt-4">
                <div className="">
                  <div className="">
                    <h5 className="text-lg font-semibold mb-3 text-primarys">RINGKASAN PESANAN | {data?.sekargaluhetnic_katalog?.length} PRODUK</h5>
                    <div className="flex justify-between mb-3">
                      <p>Subtotal produk</p>
                      <p>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between mb-n1 font-semibold">
                      <h6 className="text-uppercase">Subtotal</h6>
                      <h6>Rp{dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga.toLocaleString()}</h6>
                    </div>
                    <div className="flex justify-between">
                      <p className="">Termasuk pajak</p>
                      <p>Rp{taxProduk.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between mt-n3 mb-3">
                      <p className="">Ongkir</p>
                      <p>Rp{ongkir.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between mb-n1 font-semibold ">
                      <h6 className="text-uppercase">Total</h6>
                      <h6>Rp{totalHarga}</h6>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-xl font-semibold text-secondary">PRODUK YANG DIPESAN</h5>
                    <div className="grid-5">
                      {dataSubs?.sekargaluhetnic_katalog?.map((katalog) => 
                        <div className="grid grid-cols-12 mb-2 gap-1 border-b pb-3">
                          <div className="col-span-4 ">
                            <img className="rounded-md" src={katalog?.foto}></img>
                          </div>
                          <div className="col-span-8 d-flex align-items-center">
                            <h6 className="ms-3">{katalog.nama}</h6>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <button onClick={pesan} className="w-full bg-secondary3 text-primary mt-2 rounded-1 p-2 border border-secondary3 rounded-md hover:bg-white duration-200">BUAT PESANAN</button>
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