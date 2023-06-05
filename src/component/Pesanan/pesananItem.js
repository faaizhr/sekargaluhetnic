import {useNavigate} from "react-router-dom"
import style from './Pesanan.module.css'

const PesananItem = ({items}) => {

    console.log("cek item", items)

    // const { id, nama, harga, foto, deskripsi} = items

    const navigate = useNavigate()
    
    const handleDetail = () => {
        navigate(`/pesanan-pakaian/${items.id}`, {
            state: {
              created_at: items.created_at,
              pesanan_session: items.pesanan_session,
              pesanans: items.pesanans,
              id: items.id,
              ongkir: items.ongkir,
              status: items.status,
              chats: items.chats,
              total_harga: items.total_harga,
              user_id: items.user_id,
              user: items.user
            }
        })
    }


    let day = items.created_at.slice(8, 10)
    let month = items.created_at.slice(4, 7)
    let year = items.created_at.slice(11, 15)

    console.log("cek date", day)
    console.log("cek date", month)
    console.log("cek date", year)

    // function status()  {
    //   const stats = items.status
    //   if (stats == "Dibatalkan") {
    //     return <p className="m-0 bg-red-600 w-fit border border-red-600 px-3 py-1 text-white rounded-3xl text-[9px] lg:text-xs">{stats}</p>
    //   } else {
    //     return <p className="m-0 bg-blue-400 w-fit border border-blue-400 px-3 py-1 text-white rounded-3xl text-[9px] lg:text-xs">{stats}</p>
    //   }
    // }
    
    return (
      <div className="border-b p-2 rounded mb-2 ">
        <div className={``}>
          <div className="flex justify-between">
            <div className="flex justify-start gap-3">
              <img src={items.pesanans[0].katalog.foto} className="w-20 h-20 rounded-md object-cover md:block hidden"></img>
              <div className="flex flex-col justify-between">
                <div>
                  <h6 className="md:text-sm text-xs font-semibold text-secondary" onClick={() => handleDetail(items.id)}>{items.pesanans[0].katalog.nama}</h6>
                  <p className="text-[10px] lg:text-xs text-gray-500">1 barang x Rp{items.pesanans[0].katalog.harga.toLocaleString()}</p>
                </div>
                {items.pesanans.length > 1 ? <p className="text-[10px] lg:text-xs text-gray-500"> +{items.pesanans.length - 1} barang lainnya</p> : ""}
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
              {/* {(items.status == "Pesanan Diantar") ? 
              <p className="m-0 bg-green-400 w-44 text-center border border-green-400 px-3 py-1 text-white rounded-3xl text-[9px] lg:text-xs">{items.status}</p> :
              ""} */}


              
              {/* <p className="m-0 bg-blue-400 w-fit border border-blue-400 px-3 py-1 text-white rounded-3xl text-[9px] lg:text-xs">{items.status}</p> */}
              <status/>

              <div>
                <p className="text-xs text-gray-500">Total belanja</p>
                <p className="font-semibold">Rp{items.total_harga.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
    
    
    // return (
    //     <div>
    //         <p>CEKKK</p>
    //     </div>
    // )
}

export default PesananItem