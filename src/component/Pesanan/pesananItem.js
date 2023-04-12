import {useNavigate} from "react-router-dom"
import style from './Pesanan.module.css'

const PesananItem = ({items}) => {

    console.log("cek item", items)

    // const { id, nama, harga, foto, deskripsi} = items

    const navigate = useNavigate()
    
    const handleDetail = () => {
        navigate(`/pesanan-pakaian/${items.id}`, {
            state: {
                id: items.id,
                katalog: items.pesanans,
                ongkir: items.ongkir,
                status: items.status,
                chats: items.chats
            }
        })
    }
    // console.log("cek rating avg di listitem", ratings_aggregate)
    
    return (
      <div className="border p-2 rounded mb-2">
        <div className={``}>
          {/* <img src={foto} className={`m-auto ${style.fotoProdukList}`} alt="..." /> */}
          <div className={``}>
            <p>haloo</p>
            <p className="fs-6 fw-semibold" onClick={() => handleDetail(items.id)}>{items.pesanans[0].katalog.nama}</p>
            {/* <p className="">{deskripsi}</p> */}
            <div className="text-right">
              {/* <p className="m-0">Rp{items.katalog.harga.toLocaleString()}</p> */}
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