import { Link } from "react-router-dom" 
import { v1 } from "uuid";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from './Jahit.module.css'

import useInsertJahitSession from "../../hooks/useInsertJahitSession";

import { FiChevronRight } from "react-icons/fi"


function Jahit() {
  const navigate = useNavigate();

  // console.log(v1())
  const {insertJahitSession, loadingInsertJahitSession} = useInsertJahitSession()

  const handleClickJahit = () => {
    if (!Cookies.get("jahit-session")) {
      Cookies.set('jahit-session', v1(), { expires: 1 })
      insertJahitSession({
        variables: {
          user_id: Cookies.get("okogaye"),
          jahit_session: Cookies.get("jahit-session")
        }
      })
      navigate("/jahit-online")
      
    } else {
      navigate("/jahit-online")
    }
  }

  return(
      <div>
          <Navbar/>
          <div className={`container mt-3 d-flex justify-content-start ${style.path}`}>
            <Link className="me-1" to="/">SekarGaluhEtnic</Link>
            <FiChevronRight/>
            <p className="ms-1">Jahit</p>
          </div>

          <div className={`container mt-4 ${style.jahit}`}>
            <h2 className="mb-5">JAHIT</h2>
            <div className={`mb-5 ${style.ketentuan}`}>
              <h5>Ketentuan Jahit Online</h5>
              <ul>
                <li>Waktu pengerjaan penjahitan baju kurang lebih 4-7 hari kerja (tergantung kesulitan desain)</li>
                <li>Kami hanya menyediakan bahan terbatas, bisa memakai kain dari Anda (biaya pengiriman ditanggung pelanggan)</li>
                <li>Harga yang kami berikan adalah harga net, harga akan menyesuaikan dengan jenis pakaian (kemeja / gaun / blouse dan lain sebagainya)</li>
                <li>Bisa melakukan retur barang setelah jadinya pakaian untuk memperbaiki jika ada kesalahan MAKSIMAL 1X (biaya pengiriman ditanggung pelanggan)</li>
                <li>Toleransi jahitan 1 cm - 2 cm karena terkadang bahan tertentu bisa berubah ketika dijahit dan digosok</li>
              </ul>
            </div>
            <div className={style.jahitImage}>
              <div className={`row`}>
                <div className={`col-6 `}>
                  <img src="https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Home%2Fdrawing-fabric%20(1).jpg?alt=media&token=ff1cdf59-e6f5-4eb3-b362-a06a527ba2c0"></img>
                </div>
                <div className="col-6 d-flex align-items-center">
                  <div className="pe-3">
                    <h5>Ingin menjahit baju secara online? Ayo coba fitur jahit online kami</h5>
                    <button onClick={handleClickJahit}>Jahit Online</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
      </div>
  )
}

export default Jahit