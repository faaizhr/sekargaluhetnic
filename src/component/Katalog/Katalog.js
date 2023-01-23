import { Link } from "react-router-dom" 
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ListItem from "./ListItem";
import style from './Katalog.module.css'

import { FiChevronRight } from "react-icons/fi"

import useGetKatalog from "../../hooks/useGetKatalog";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Katalog() {
    
  const {data: dataKatalog, loading: loadingKatalog, error} = useGetKatalog()
  // console.log("data katalog", dataKatalog.sekargaluhetnic_katalog)


  return(
      <div>
          <Navbar/>
          <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
            <Link className="me-1" to="/">SekarGaluhEtnic</Link>
            <FiChevronRight/>
            <p className="ms-1">Katalog</p>
          </div>

          <div className={`container mt-4 ${style.katalog}`}>
            <h2 className="mb-5">KATALOG</h2>
            <div className={`row`}>
              <div className={`col-2 ${style.filterKatalog}`}>
                <h5>Filter</h5>
                <h6>Gender</h6>
                <p>Wanita</p>
                <p>Pria</p>
                <h6>Kategori</h6>
                <p>Kemeja Lengan Panjang</p>
                <p>Kemeja Lengan Pendek</p>
                <p>Gaun</p>
                <p>Blouse</p>
                <p>Rok</p>
              </div>
              <div className="col-10">
                <div className="d-flex justify-content-between">
                  <div className={style.sortKatalog}>
                    <select>
                      <option>Pilih Berdasarkan</option>
                      <option>Termahal - Termurah</option>
                      <option>Termurah - Termahal</option>
                    </select>
                  </div>
                  <div className={style.searchbar}>
                    <input type="text" placeholder="Cari Pakaian...."></input>
                    <button>Cari</button>
                  </div>
                </div>
                <div className={`d-flex justify-content-between flex-wrap mt-5`}>
                  {dataKatalog?.sekargaluhetnic_katalog?.map((katalog) => <ListItem key={katalog.id} items={katalog}/>)}
                </div>
              </div>
            </div>
          </div>
          <Footer />
      </div>
  )
}

export default Katalog