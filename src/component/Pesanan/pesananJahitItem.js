import {useNavigate} from "react-router-dom"
import React from 'react'

export default function PesananJahitItem({items}) {

  const navigate = useNavigate()
    
    const handleDetail = () => {
        navigate(`/pesanan-jahit/${items.id}`, {
            state: {
              created_at: items.created_at,
              updated_at: items.updated_at,
              jahit_session: items.jahit_session,
              foto_desains: items.foto_desains,
              id: items.id,
              jenis_pakaian: items.jenis_pakaian,
              kain: items.kain,
              deskripsi: items.deskripsi,
              lebar_bahu: items.lebar_bahu,
              lingkar_dada: items.lingkar_dada,
              lingkar_kerung_lengan: items.lingkar_kerung_lengan,
              lingkar_leher: items.lingkar_leher,
              lingkar_pergelangan_tangan: items.lingkar_pergelangan_tangan,
              lingkar_pinggang: items.lingkar_pinggang,
              lingkar_pinggul: items.lingkar_pinggul,
              panjang_baju: items.panjang_baju,
              panjang_lengan: items.panjang_lengan,
              ongkir: items.ongkir,
              opsi_pengiriman: items.opsi_pengiriman,
              status: items.status,
              total_biaya: items.total_biaya,
              user_id: items.user_id,
            }
        })
    }

  console.log("cek item jahit", items)
  return (
    <div>
      <div onClick={() => handleDetail(items.id)} className="border-b p-2 rounded mb-2 cursor-pointer">
        <div className={``}>
            <div className="flex justify-between">
                <div className="flex justify-start gap-3">
                    <img src={items.foto_desains[0].foto} className="w-20 h-20 rounded-md object-cover md:block hidden"></img>
                    <div className="flex flex-col justify-between">
                        <div >
                        <h6 className="md:text-sm text-xs  font-semibold text-secondary">{items.jenis_pakaian}</h6>
                        <p className="text-[10px] lg:text-xs text-gray-500">{items.kain}</p>
                        </div>
                        {/* {items.pesanans.length > 1 ? <p className="text-[10px] lg:text-xs text-gray-500"> +{items.pesanans.length - 1} barang lainnya</p> : ""} */}
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                  {(items.status == "Dibatalkan") ? 
                  <p className="m-0 bg-red-600 w-36 md:w-44 text-center border border-red-600 px-3 py-1 text-white rounded-3xl text-[9px] lg:text-xs">{items.status}</p> :
                  ""}
                  {(items.status == "Menunggu Pembayaran") ? 
                  <p className="m-0 bg-yellow-500 w-36 md:w-44 text-center border border-yellow-500 px-3 py-1 text-white rounded-3xl text-[9px] lg:text-xs">{items.status}</p> :
                  ""}
                  {(items.status == "Pembayaran Diproses") ? 
                  <p className="m-0 bg-blue-400 w-36 md:w-44 text-center border border-blue-400 px-3 py-1 text-white rounded-3xl text-[9px] lg:text-xs">{items.status}</p> :
                  ""}
                  {(items.status == "Pesanan Diproses") || (items.status == "Pesanan Diantar") || (items.status == "Menunggu Kurir") || (items.status == "Pesanan Selesai") || (items.status == "Pembayaran Diterima") ? 
                  <p className="m-0 bg-green-400 w-36 md:w-44 text-center border border-green-400 px-3 py-1 text-white rounded-3xl text-[9px] lg:text-xs">{items.status}</p> :
                  ""}

                    <div>
                        <p className="text-xs text-gray-500">Total Biaya</p>
                        <p className="font-semibold">Rp{items.total_biaya.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
