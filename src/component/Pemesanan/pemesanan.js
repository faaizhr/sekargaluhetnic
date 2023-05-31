
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

import { GetKeranjangKatalog, GetSumKeranjang, CountPesananPakaian } from "../../graphql/query"
import { GetAnotherKatalog } from "../../graphql/query"
import useGetKeranjangKatalog from "../../hooks/useGetKeranjangKatalog"
import useInsertToCart from "../../hooks/useInsertToCart"
import useInsertToPemesanan from "../../hooks/useInsertToPemesanan"
import { SubscriptionKeranjangKatalog } from "../../graphql/subscription"
import { SubscriptionSumKeranjang } from "../../graphql/subscription"
import { InsertPemesananPakaian } from "../../graphql/mutation";
import { UpdatePemesananPakaian } from "../../graphql/mutation";
import { EmptyCart } from "../../graphql/mutation";
import { DecreaseStok } from "../../graphql/mutation";

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

  const mappingKeranjang = dataSubs?.sekargaluhetnic_katalog?.map(function(el) {
    return {
      "where": {"id": {"_eq": el.id}},
      "_set": {"stok": el.stok - 1}
    }
  }) 
  

  const [ongkir, setOngkir] = useState(0)
  const [opsiPengiriman, setOpsiPengiriman] = useState("")
  let totalHarga = dataTotalProduk?.sekargaluhetnic_katalog_aggregate.aggregate.sum.harga + parseInt(ongkir)

  
  useEffect(() => { 
    if (dataAlamat?.provinsi == "Nanggroe Aceh Darussalam") {
      if (opsiPengiriman == "reguler") {
        setOngkir(54000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(63000)
      }
    } else if (dataAlamat?.provinsi == "Sumatera Utara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(47000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(53000)
      }
    } else if (dataAlamat?.provinsi == "Sumatera Selatan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(23000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(46000)
      }
    } else if (dataAlamat?.provinsi == "Sumatera Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(38000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(49000)
      }
    } else if (dataAlamat?.provinsi == "Bengkulu") {
      if (opsiPengiriman == "reguler") {
        setOngkir(34000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(39000)
      }
    } else if (dataAlamat?.provinsi == "Riau") {
      if (opsiPengiriman == "reguler") {
        setOngkir(38000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(49000)
      }
    } else if (dataAlamat?.provinsi == "Kepulauan Riau") {
      if (opsiPengiriman == "reguler") {
        setOngkir(47000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(55000)
      }
    } else if (dataAlamat?.provinsi == "Jambi") {
      if (opsiPengiriman == "reguler") {
        setOngkir(25000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(29000)
      }
    } else if (dataAlamat?.provinsi == "Lampung") {
      if (opsiPengiriman == "reguler") {
        setOngkir(20000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(38000)
      }
    } else if (dataAlamat?.provinsi == "Bangka Belitung") {
      if (opsiPengiriman == "reguler") {
        setOngkir(29000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(48000)
      }
    } else if (dataAlamat?.provinsi == "Kalimantan Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(47000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(60000)
      }
    } else if (dataAlamat?.provinsi == "Kalimantan Timur") {
      if (opsiPengiriman == "reguler") {
        setOngkir(59000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(69000)
      }
    } else if (dataAlamat?.provinsi == "Kalimantan Selatan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(45000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(52000)
      }
    } else if (dataAlamat?.provinsi == "Kalimantan Tengah") {
      if (opsiPengiriman == "reguler") {
        setOngkir(45000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(52000)
      }
    } else if (dataAlamat?.provinsi == "Kalimantan Utara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(77000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(90000)
      }
    } else if (dataAlamat?.provinsi == "Banten") {
      if (opsiPengiriman == "reguler") {
        setOngkir(12000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(24000)
      }
    } else if (dataAlamat?.provinsi == "DKI Jakarta") {
      if (opsiPengiriman == "reguler") {
        setOngkir(10000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(18000)
      }
    } else if (dataAlamat?.provinsi == "Jawa Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(12000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(24000)
      }
    } else if (dataAlamat?.provinsi == "Jawa Tengah") {
      if (opsiPengiriman == "reguler") {
        setOngkir(19000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(35000)
      }
    } else if (dataAlamat?.provinsi == "Daerah Istimewa Yogyakarta") {
      if (opsiPengiriman == "reguler") {
        setOngkir(19000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(35000)
      }
    } else if (dataAlamat?.provinsi == "Jawa Timur") {
      if (opsiPengiriman == "reguler") {
        setOngkir(20000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(37000)
      }
    } else if (dataAlamat?.provinsi == "Bali") {
      if (opsiPengiriman == "reguler") {
        setOngkir(30000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(50000)
      }
    } else if (dataAlamat?.provinsi == "Nusa Tenggara Timur") {
      if (opsiPengiriman == "reguler") {
        setOngkir(74000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(86000)
      }
    } else if (dataAlamat?.provinsi == "Nusa Tenggara Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(46000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(60000)
      }
    } else if (dataAlamat?.provinsi == "Gorontalo") {
      if (opsiPengiriman == "reguler") {
        setOngkir(73000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(85000)
      }
    } else if (dataAlamat?.provinsi == "Sulawesi Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(55000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(64000)
      }
    } else if (dataAlamat?.provinsi == "Sulawesi Tengah") {
      if (opsiPengiriman == "reguler") {
        setOngkir(73000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(85000)
      }
    } else if (dataAlamat?.provinsi == "Sulawesi Utara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(67000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(78000)
      }
    } else if (dataAlamat?.provinsi == "Sulawesi Tenggara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(73000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(85000)
      }
    } else if (dataAlamat?.provinsi == "Sulawesi Selatan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(56000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(75000)
      }
    } else if (dataAlamat?.provinsi == "Maluku Utara") {
      if (opsiPengiriman == "reguler") {
        setOngkir(89000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(104000)
      }
    } else if (dataAlamat?.provinsi == "Maluku ") {
      if (opsiPengiriman == "reguler") {
        setOngkir(89000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(104000)
      }
    } else if (dataAlamat?.provinsi == "Papua Barat") {
      if (opsiPengiriman == "reguler") {
        setOngkir(139000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(163000)
      }
    } else if (dataAlamat?.provinsi == "Papua") {
      if (opsiPengiriman == "reguler") {
        setOngkir(117000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(137000)
      }
    } else if (dataAlamat?.provinsi == "Papua Tengah") {
      if (opsiPengiriman == "reguler") {
        setOngkir(134000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(157000)
      }
    } else if (dataAlamat?.provinsi == "Papua Pegunungan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(134000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(157000)
      }
    } else if (dataAlamat?.provinsi == "Papua Selatan") {
      if (opsiPengiriman == "reguler") {
        setOngkir(166000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(195000)
      }
    } else if (dataAlamat?.provinsi == "Papua Barat Daya") {
      if (opsiPengiriman == "reguler") {
        setOngkir(122000)
      } else if (opsiPengiriman == "cepat") {
        setOngkir(143000)
      }
    } 
    
  }, [opsiPengiriman])
  
  console.log("opsi", opsiPengiriman)
  console.log("cek ongkir" ,ongkir)

  const [emptyCart, {loading: loadingEmptyCart}] = useMutation(EmptyCart)
  const [updatePemesananPakaian, {loading: loadingUpdatePemesananPakaian}] = useMutation(UpdatePemesananPakaian)
  const {insertPemesananPakaian, loadingInsertPemesananPakaian} = useInsertToPemesanan()
  const [decreaseStok, {loading: loadingDecreaseStok}] = useMutation(DecreaseStok)

  var date = new Date()
  var day = ("0" + date.getDate()).slice(-2)
  var month = ("0" + date.getMonth()).slice(-2)
  var year = date.getFullYear()
  
  var fulltime = year + month + day
  console.log("cek bulan", fulltime)

  const {data: dataCountPesanan} = useQuery(CountPesananPakaian)
  const [kodePemesanan, setKodePemesanan] = useState()

  useEffect(() => {
    setKodePemesanan("PPKN" + "/" + fulltime + "/" + (dataCountPesanan?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count + 1))
  
  }, [fulltime + dataCountPesanan?.sekargaluhetnic_pesanan_pakaian_aggregate.aggregate.count])
  
  console.log("cek state kode", kodePemesanan)

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
            created_at: Date(),
            opsi_pengiriman: opsiPengiriman,
            kode_pemesanan: kodePemesanan
          }
        })

        emptyCart({
          variables: {
            _eq: Cookies.get("okogaye")
          }
        })

        decreaseStok({
          variables: {
            updates: mappingKeranjang
          }
        })

        navigate("/profil")
        // setTimeout(() => {
        //   window.location.reload(false);
        // }, 1500);
      }
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