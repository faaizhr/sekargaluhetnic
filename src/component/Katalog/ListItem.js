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
      <div className={`mb-4 ${style.menuItem}`}>
        <div className={`card ${style.cardListCustom}`}>
          <img src={foto} className={style.fotoProdukList} alt="..." />
          <div className={`card-body ${style.cardBodyCustom}`}>
            <p>Pria</p>
            <h5 className={`card-title lh-base ${style.textCard}`} onClick={() => handleDetail(items.id)}>{nama}</h5>
            {/* <p className="">{deskripsi}</p> */}
            <div className="text-right">
              <h6 className="card-text">Rp{harga.toLocaleString()}</h6>
            </div>
          </div>
          <ul className="list-group list-group-flush">
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