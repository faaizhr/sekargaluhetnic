import { Link } from "react-router-dom" 
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ListItem from "./ListItem";
import style from './Katalog.module.css'
import LoadingSvg from "../Loading/LoadingSvgTransparent";

import { FiChevronRight } from "react-icons/fi"

import useGetKatalog from "../../hooks/useGetKatalog";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Katalog() {
    
  const {data: dataKatalog, loading: loadingKatalog, error} = useGetKatalog()
  // console.log("data katalog", dataKatalog.sekargaluhetnic_katalog)


  return(
      <div>
          <Navbar/>
          <div className="container mx-auto flex justify-start items-center gap-2">
            <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
            <FiChevronRight/>
            <p className="font-semibold">Katalog</p>
          </div>

          <div className="container mx-auto mt-4">
            <h2 className="lg:text-6xl text-4xl font-bold text-primary my-14">KATALOG</h2>
            <div className="grid lg:grid-cols-12 gap-5">
              <div className="col-span-12 lg:col-span-2">
                <h5 className="text-xl font-semibold text-primary">Filter</h5>
                <h6 className="mt-3 mb-1 font-semibold text-secondary">Gender</h6>
                <div className="ml-2 grid gap-2">
                  <p>Wanita</p>
                  <p>Pria</p>
                </div>
                <h6 className="mt-3 mb-1 font-semibold text-secondary">Kategori</h6>
                <div className="ml-2 grid gap-2">
                  <p>Kemeja Lengan Panjang</p>
                  <p>Kemeja Lengan Pendek</p>
                  <p>Gaun</p>
                  <p>Blouse</p>
                  <p>Rok</p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <div className="lg:flex lg:justify-between mb-10">
                  <div className="flex justify-end">
                    <select className="border-b p-2 text-sm text-gray-500 focus:outline-none">
                      <option>Pilih Berdasarkan</option>
                      <option>Termahal - Termurah</option>
                      <option>Termurah - Termahal</option>
                    </select>
                  </div>
                  <div className="border-b rounded-md mt-5 lg:mt-0">
                    <input type="text" className="w-10/12 lg:w-fit p-2 text-sm text-gray-500 focus:outline-none" placeholder="Cari Pakaian...."></input>
                    <button className="bg-secondary2 p-2 text-white rounded-e-md w-2/12 lg:w-fit">Cari</button>
                  </div>
                </div>

                {loadingKatalog ? <LoadingSvg/> :
                  <div className={`grid grid-cols-2 lg:grid-cols-4 mt-5 gap-7`}>
                    {dataKatalog?.sekargaluhetnic_katalog?.map((katalog) => <ListItem key={katalog.id} items={katalog}/>)}
                  </div>
                }
              </div>
            </div>
          </div>
          <Footer />
      </div>
  )
}

export default Katalog