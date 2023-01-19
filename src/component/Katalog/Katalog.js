import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ListItem from "./ListItem";
import style from './Katalog.module.css'

import useGetKatalog from "../../hooks/useGetKatalog";

function Katalog() {
    
  const {data: dataKatalog, loading: loadingKatalog, error} = useGetKatalog()
  // console.log("data katalog", dataKatalog.sekargaluhetnic_katalog)

  return(
      <div>
          <Navbar/>
          <div className={`d-flex align-items-center ${style.jumbotronCustom}`}>
            <div className="container ">
              <h1>KATALOG</h1>
            </div>
          </div>

          <div className="container mt-5">
            <div className={`d-flex justify-content-between flex-wrap`}>
              {dataKatalog?.sekargaluhetnic_katalog?.map((katalog) => <ListItem key={katalog.id} items={katalog}/>)}
            </div>
          </div>
          <Footer />
      </div>
  )
}

export default Katalog