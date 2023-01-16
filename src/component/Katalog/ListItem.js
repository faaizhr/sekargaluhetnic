import {useNavigate} from "react-router-dom"
import style from './Detail.module.css'

const ListItem = ({item}) => {

    // console.log("cek item", item)

    const { id, nama_menu, harga, deskripsi, foto, comments, penjelasan, komposisi } = item

    const navigate = useNavigate()
    
    const handleDetail = () => {
        navigate(`/menu/${item.id}`, {
            state: {
                id: item.id, 
                nama_menu: item.nama_menu,
                harga: item.harga,
                deskripsi: item.deskripsi,
                foto: item.foto,
                comments: item.comments,
                penjelasan: item.penjelasan,
                komposisi: item.komposisi
            }
        })
    }
    // console.log("cek rating avg di listitem", ratings_aggregate)
    
    return (
      <div className={`mb-4 ${style.menuItem}`}>
        <div className={`card ${style.cardListCustom}`}>
          <img src={foto} className={style.fotoProdukList} alt="..." />
          <div className={`card-body ${style.cardBodyCustom}`}>
            <h5 className={`card-title lh-base ${style.textCard}`} onClick={() => handleDetail(item.id)}>{nama_menu}</h5>
            <p className="">{penjelasan}</p>
            <div className="text-right">
              <h6 className="card-text">{harga}</h6>
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