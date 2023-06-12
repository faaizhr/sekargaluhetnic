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
      // window.location.reload(false);
      
    } else {
      navigate("/jahit-online")
    }
  }

  return(
      <div>
          <Navbar/>
          <div className="container mx-auto flex justify-start items-center gap-2">
                <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
                <FiChevronRight/>
                <p className="font-semibold">Jahit</p>
            </div>

          <div className={`container mt-14 mx-auto`}>
            <h2 className="mb-5 text-primary text-6xl font-bold">JAHIT</h2>
            <div className={`mb-5 `}>
              <h5 className="font-semibold text-primary">Ketentuan Jahit Online</h5>
              <ul className="list-disc list-outside ml-5 text-sm">
                <li>Waktu pengerjaan penjahitan baju kurang lebih 4-7 hari kerja (tergantung kesulitan desain)</li>
                <li>Kami hanya menyediakan bahan terbatas sesuai ketersediaan bahan</li>
                <li>Harga yang kami berikan adalah harga net, harga akan menyesuaikan dengan jenis pakaian (kemeja / gaun / blouse dan lain sebagainya)</li>
                <li>Bisa melakukan retur barang setelah jadinya pakaian untuk memperbaiki jika ada kesalahan MAKSIMAL 1X (biaya pengiriman ditanggung pelanggan)</li>
                <li>Toleransi jahitan 1 cm - 2 cm karena terkadang bahan tertentu bisa berubah ketika dijahit dan digosok</li>
              </ul>
            </div>
            <div className="bg-secondary rounded-md mb-20">
              <div className={`grid lg:grid-cols-2`}>
                <div className={` `}>
                  <img className="rounded-l-md" src="https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Home%2Fdrawing-fabric%20(1).jpg?alt=media&token=ff1cdf59-e6f5-4eb3-b362-a06a527ba2c0"></img>
                </div>
                <div className="flex items-center px-5 py-10">
                  <div className="">
                    <h5 className="font-semibold text-2xl text-secondary3">Ingin menjahit baju secara online? Ayo coba fitur jahit online kami</h5>
                    <button onClick={handleClickJahit} className="w-full bg-secondary3 rounded-md mt-5 py-2 text-secondary border border-secondary3 font-medium hover:bg-secondary hover:text-secondary3 duration-200">Jahit Online</button>
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