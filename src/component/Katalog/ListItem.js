import {useNavigate} from "react-router-dom"
import style from './Katalog.module.css'

const ListItem = ({items}) => {

    // console.log("cek item", item)

    const { id, nama, harga, foto, deskripsi} = items

    const navigate = useNavigate()
    
    const handleDetail = () => {
        navigate(`/menu/${items.id}`, {
            state: {
                id: items.id,
                nama: items.nama,
                harga: items.harga,
                deskripsi: items.deskripsi,
                foto: items.foto
            }
        })
    }
    // console.log("cek rating avg di listitem", ratings_aggregate)
    
    return (
      <div className="hover:shadow-md rounded-md duration-300 max-w-[200px] w-full border">
        <div className="">
          <img src={foto} className="rounded-t-md mb-3 " alt="..." />
          <div className="px-3 pb-3">
            <p className="text-gray-600 font-semibold text-xs">Wanita</p>
            <h5 className="font-medium text-primary text-sm h-11 cursor-pointer" onClick={() => handleDetail(items.id)}>{nama}</h5>
            {/* <p className="">{deskripsi}</p> */}
            <div className="text-right">
              <h6 className="text-base font-semibold text-secondary">Rp{harga.toLocaleString()}</h6>
            </div>
          </div>
          <ul className="">
            {/* <li className="list-group-item">{item.id}</li> */}
            {/* <li className="list-group-item">{penulis}</li>
            <li className="list-group-item">{penerbit}</li>
            <li className="list-group-item">{tahunTerbit}</li> */}
          </ul>
        </div>
      </div>
    )
    
    
    
    // return (
    //     <div>
    //         <p>CEKKK</p>
    //     </div>
    // )
}

export default ListItem