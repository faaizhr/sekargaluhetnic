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


    let day = items.created_at.slice(8, 10)
    let month = items.created_at.slice(4, 7)
    let year = items.created_at.slice(11, 15)

    console.log("cek date", day)
    console.log("cek date", month)
    console.log("cek date", year)
    
    return (
      <div className="border p-2 rounded mb-2 ">
        <div className={``}>
          <div className={``}>
            <p className="m-0">{items.status}</p>
            <p className="m-0 fw-semibold" onClick={() => handleDetail(items.id)}>{items.pesanans[0].katalog.nama}</p>
            <div className="text-right">

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