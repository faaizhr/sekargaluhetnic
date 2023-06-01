import { Link } from "react-router-dom" 
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ListItem from "./ListItem";
import style from './Katalog.module.css'
import LoadingSvg from "../Loading/LoadingSvgTransparent";

import { FiChevronRight } from "react-icons/fi"

import useGetKatalog from "../../hooks/useGetKatalog";
import { SeacrhKatalog, FilterKatalog } from "../../graphql/query";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

function Katalog() {
    
  const {data: dataKatalog, loading: loadingKatalog, error} = useGetKatalog()
  // console.log("data katalog", dataKatalog.sekargaluhetnic_katalog)

  const [searchState, setSearchState] = useState("%%")
  const [filterState, setFilterState] = useState("%%")
  const {data: dataSearch, loading: loadingSearch, error: errorSearch} = useQuery(SeacrhKatalog, { variables: {_ilike: searchState}})
  const {data: dataFilter, loading: loadingFilter, error: errorFilter} = useQuery(FilterKatalog, { variables: {_ilike: filterState}})

  const handleInputSearch = (e) => {
    setSearchState("%" + e.target.value + "%")
  }

  console.log("cek state", searchState)

  console.log("cek data filter", dataFilter)

  const [data, setData] = useState()

  useEffect(() => {
    setData(dataSearch)
  }, [dataSearch])
  useEffect(() => {
    setData(dataFilter)
  }, [dataFilter])
  

  

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
                  <p className="cursor-pointer" onClick={() => setFilterState("%wanita%")}>Wanita</p>
                  <p className="cursor-pointer" onClick={() => setFilterState("%pria%")}>Pria</p>
                  <p className="cursor-pointer" onClick={() => setFilterState("%%")}>Semua Gender</p>
                </div>
                {/* <h6 className="mt-3 mb-1 font-semibold text-secondary">Kategori</h6>
                <div className="ml-2 grid gap-2">
                  <p>Kemeja Lengan Panjang</p>
                  <p>Kemeja Lengan Pendek</p>
                  <p>Gaun</p>
                  <p>Blouse</p>
                  <p>Rok</p>
                </div> */}
              </div>
              
              <div className="col-span-12 lg:col-span-10">
                <div className="lg:flex lg:justify-between mb-10">
                  <div className="flex justify-start gap-5">
                    <div>
                      <select className="border-b p-2 text-sm text-gray-500 focus:outline-none">
                        <option disabled selected="selected">Urutkan</option>
                        <option>Termahal - Termurah</option>
                        <option>Termurah - Termahal</option>
                      </select>
                    </div>
                    {/* <div>
                      <select className="border-b p-2 text-sm text-gray-500 focus:outline-none">
                        <option disabled selected="selected">Filter</option>
                        <option>Wanita</option>
                        <option>Pria</option>
                      </select>
                    </div> */}
                  </div>
                  <div className="border-b rounded-md mt-5 lg:mt-0">
                    <input onChange={handleInputSearch} name="search" type="text" className="w-10/12 lg:w-fit p-2 text-sm text-gray-500 focus:outline-none" placeholder="Cari Pakaian...."></input>
                    <button className="bg-secondary2 p-2 text-white rounded-e-md w-2/12 lg:w-fit ">Cari</button>
                  </div>
                </div>

                {loadingSearch ? <LoadingSvg/> :
                  <div className={`grid grid-cols-2 lg:grid-cols-4 mt-5 gap-7`}>
                    {data?.sekargaluhetnic_katalog?.map((katalog) => <ListItem key={katalog.id} items={katalog}/>)}
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