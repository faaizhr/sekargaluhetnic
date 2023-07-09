import {useNavigate} from "react-router-dom"
import style from './Katalog.module.css'

const ListItem = ({items}) => {

    // console.log("cek item", item)

    const { id, nama, harga, foto, deskripsi} = items

    const navigate = useNavigate()
    
    const handleDetail = () => {
        navigate(`/katalog/${items.id}`, {
            state: {
                id: items.id,
                nama: items.nama,
                harga: items.harga,
                deskripsi: items.deskripsi,
                foto: items.foto,
                gender: items.gender,
                ukuran: items.ukuran,
                kode_produk: items.kode_produk,
                material: items.material,
                stok: items.stok
            }
        })
    }
    // console.log("cek rating avg di listitem", ratings_aggregate)
    
    return (
      <div>
        { (items.stok > 0) 
          ? 
          <div className="hover:shadow-md rounded-md duration-300 max-w-[300px] w-full border mx-auto">
            <div className="">
              <img  onClick={() => handleDetail(items.id)} src={foto} className="rounded-t-md mb-3 cursor-pointer" alt="..." />
              <div className="px-3 pb-3">
                <p className="text-gray-600 font-semibold text-xs">Wanita</p>
                <h5 className="font-medium text-primary text-sm h-11 cursor-pointer" onClick={() => handleDetail(items.id)}>{nama}</h5>
                {/* <p className="">{deskripsi}</p> */}
                <div className="text-right">
                  <h6 className="text-base font-semibold text-secondary">Rp{harga.toLocaleString()}</h6>
                </div>
              </div>
            </div>
          </div> 
          : 
          <div className="rounded-md max-w-[300px] bg-gray-200 z-20 relative mx-auto">
            <div className="hover:shadow-md rounded-md duration-300 max-w-[300px] relative w-full border z-10 mx-auto">
              <div className="">
                <img src={foto} className="rounded-t-md mb-3 grayscale" alt="..." />
                {/* <p className="absolute -top-60 left-2 text-xl text-secondary3 font-medium">Stok habis</p> */}
                <div className="px-3 pb-3">
                  <p className="text-gray-600 font-semibold text-xs">Wanita</p>
                  <h5 className="font-medium text-primary text-sm h-11">{nama}</h5>
                  <p className="text-[11px] float-left">Stok Habis</p>
                  <div className="text-right">
                    <h6 className="text-base font-semibold text-secondary">Rp{harga.toLocaleString()}</h6>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        }
        
      </div>
    )
    
    
    
    // return (
    //     <div>
    //         <p>CEKKK</p>
    //     </div>
    // )
}

export default ListItem