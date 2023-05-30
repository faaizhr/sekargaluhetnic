import { useEffect, useState } from "react"
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client"
import { Link, useNavigate } from "react-router-dom"

import { FiChevronRight } from "react-icons/fi"

import LoadingSvg  from "../Loading/LoadingSvgTransparent"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import MenuProfil from "../Profile/MenuProfil"

import Cookies from "js-cookie";

import { GetReturBarangPakaian } from "../../graphql/query"
import { GetReturBarangJahit } from "../../graphql/query"

export default function ReturBarang() {

  const navigate = useNavigate()

  const {data: dataReturJahit, loading: loadingReturPakaian, error: errorReturPakaian} = useQuery(GetReturBarangPakaian, { variables: {_eq: Cookies.get("okogaye")}})
  const {data: dataReturPakaian, loading: loadingReturJahit, error: errorReturJahit} = useQuery(GetReturBarangJahit, { variables: {_eq: Cookies.get("okogaye")}})
  console.log("cek data", dataReturJahit)

  const [handleID, setHandleID] = useState()

  const handleNavigatePakaian = (id) => {
    navigate(`/pesanan-pakaian/${id}`, {
      state: {
        id: id
      }
    })

  }

  const handleNavigateJahit = (id) => {
    navigate(`/pesanan-jahit/${id}`, {
      state: {
        id: id
      }
    })
  }

  return (
    <div>
      <Navbar/>
      <div className="container mx-auto flex justify-start items-center gap-2">
        <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
        <FiChevronRight/>
        <Link className="" to="/profil"><p>Profil</p></Link>
        <FiChevronRight/>
        <p className="font-semibold">Retur Barang</p>
      </div>

      <div className="container mx-auto mt-14">
        <h2 className="text-primary text-4xl lg:text-6xl font-bold uppercase mb-10">Permintaan Retur Barang</h2>

        <div className="grid lg:grid-cols-12">
          <div className="col-span-3">
            <MenuProfil/>
          </div>
          <div className="col-span-9">
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="border col-span-1 p-2 rounded-md grid gap-5">
                <h5 className="uppercase text-xl font-semibold text-secondary">Pesanan Pakaian</h5>
                { dataReturPakaian?.sekargaluhetnic_retur_produk.map((el) => 
                  <div onClick={() => handleNavigatePakaian(el.retur_produk_pesanan_pakaian.id)} className="border-b pb-2 grid grid-cols-2 cursor-pointer">
                    <div>
                      <h6 className="font-medium text-sm text-primary">Kode Pemesanan</h6>
                      <p>{el.retur_produk_pesanan_pakaian.kode_pemesanan}</p>
                      <p>{el.retur_produk_pesanan_pakaian.pesanans.length} produk</p>
                    </div>
                    <div>
                      <p className="text-[10px] bg-blue-500 text-white px-5 py-1 rounded-full w-fit">{el.status}</p>
                      <h6 className="text-sm font-medium mt-3">Total Harga Pesanan</h6>
                      <p>Rp{el.retur_produk_pesanan_pakaian.total_harga.toLocaleString()}</p>
                    </div>
                    <div>
                      {/* { el.retur_produk_pesanan_pakaian.pesanans.map((el) => 
                        <div>
                          <img className="w-20 h-20" src={el.katalog.foto}></img>
                        </div>
                      )} */}
                    </div>
                  </div>
                )}
              </div>

              <div className="border col-span-1 p-2 rounded-md grid gap-5">
                <h5 className="uppercase text-xl font-semibold text-secondary">Pesanan Jahit</h5>
                { dataReturJahit?.sekargaluhetnic_retur_produk.map((el) => 
                  <div onClick={() => handleNavigateJahit(el.retur_produk_pesanan_jahit.id)} className="border-b pb-2 grid grid-cols-2 cursor-pointer">
                  <div>
                    <h6 className="font-medium text-sm text-primary">Kode Pemesanan</h6>
                    <p>{el.retur_produk_pesanan_jahit.kode_pemesanan}</p>
                    {/* <p>{el.retur_produk_pesanan_jahit.pesanans.length} produk</p> */}
                  </div>
                  <div>
                    <p className="text-[10px] bg-blue-500 text-white px-5 py-1 rounded-full w-fit">{el.status}</p>
                    <h6 className="text-sm font-medium mt-3">Total Harga Pesanan</h6>
                    <p>Rp{el.retur_produk_pesanan_jahit.total_biaya.toLocaleString()}</p>
                  </div>
                  <div>
                    {/* { el.retur_produk_pesanan_pakaian.pesanans.map((el) => 
                      <div>
                        <img className="w-20 h-20" src={el.katalog.foto}></img>
                      </div>
                    )} */}
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>


      </div>


      <Footer/>
    </div>
  )
}
