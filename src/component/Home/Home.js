import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import style from './Home.module.css'
// import useGetComicLatest from "../../hooks/useGetComicLatest";
// import useGetComicBest from "../../hooks/useGetBestMenu";
import useGetKatalog from "../../hooks/useGetKatalog";
import ListItem from "../Katalog/ListItem";
import Footer from "../Footer/Footer";
import CarouselItem from "../Carousel/CarouselItem";
import Carousel from 'react-material-ui-carousel'


function Home() {

  // const {data: dataMenu, loading: loadingMenu, error} = useGetMenu()
  // console.log("data latest di home", dataMenu)

  // const {data: bestMenu, loading: loadingBestMenu, error: errorBestMenu} = useGetBestMenu() 
  // console.log("data best", bestMenu)

  var items = [
    {
        name: "Jahit Baju Online",
        description: "Ingin menjahit baju tanpa keluar rumah? Kami menyediakan fitur jahit online dimana Anda hanya perlu memberikan ukuran tubuh kalian, desain yang diinginkan, foto contoh pakaian yang dinginkan, dan bisa memilih menggunakan bahan yang tersedia di toko kami ataupun bahan dari Anda.",
        image: "https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Carousel%2Fclose-up-woman-working-with-sewing-machine.jpg?alt=media&token=824855d4-9610-418a-86c2-1b57c1bc262e",
        button: "Jahit Online",
        link: "/jahit"
    },
    {
        name: "Batik",
        description: "Kami menjual berbagai macam jenis pakaian mulai dari kemeja, kebaya, outer, dan lain sebagainya yang berfokus menggunakan kain batik",
        image: "https://cdn.discordapp.com/attachments/915505289174847510/1065477784794832947/fashion-designer-cutting-tailor-made-concept_1.jpg",
        button: "Lihat Katalog",
        link: "/katalog"
    }
]
  const navigate = useNavigate()

  const navigateJahit = () => {
    navigate("/jahit")
  } 
  const navigateKatalog = () => {
    navigate("/katalog")
  } 


  return (
    <div>
      <Navbar/>
      <div className="-mt-5 mb-20">
          <Carousel>
              {
                items.map( (item, i) => <CarouselItem key={i} item={item} /> )
              }
          </Carousel>
      </div>
      <div className="container mx-auto">

        <div className="">

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <img className="lg:mx-0 mx-auto" src="https://media.discordapp.net/attachments/915505289174847510/1064440531389784074/Desktop_-_2.png?width=424&height=550"></img>
            </div>
            <div className="lg:col-span-3 flex items-center">
              <div className="">
                <h3 className="font-semibold text-2xl text-secondary">Apa yang kami lakukan?</h3>
                <p className="text-base mt-3">Kami menjahit pakaian dengan spesialisasi menjahit batik. Kami menerima pesanan jahit kustom sesuai dengan permintaan pelanggan dan juga menjahit pakaian untuk dijual secara bebas.</p>
                <button onClick={navigateJahit} className="mt-3 px-10 py-3 bg-secondary text-white rounded-md">Selengkapnya</button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 mt-10 gap-10">
            <div className="col-span-3 flex items-center">
              <div>
                <h3 className="lg:text-right font-semibold text-2xl text-secondary2">Apa yang kami jual?</h3>
                <p className="lg:text-right text-base mt-3">Kami menjual produk berupa pakaian yang sudah jadi. Pakaian yang dijual adalah pakaian hasil jahitan dari UMKM kami dan juga desain kami pribadi. Kami juga membuka jasa jahit pakaian secara kustom.</p>
                <div className="flex lg:justify-end">
                  <button onClick={navigateKatalog} className="mt-3 px-10 py-3 bg-secondary2 text-white rounded-md">Selengkapnya</button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 col-span-3">
              <img src="https://media.discordapp.net/attachments/915505289174847510/1064440532006350848/Desktop_-_3.png?width=424&height=550"></img>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home