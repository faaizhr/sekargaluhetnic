import Navbar from "../Navbar/Navbar";
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
        link: ""
    },
    {
        name: "Random Name #2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum velit laoreet id donec ultrices tincidunt arcu non sodales.",
        image: "https://cdn.discordapp.com/attachments/915505289174847510/1065477784794832947/fashion-designer-cutting-tailor-made-concept_1.jpg",
        button: "Jahit Online",
        link: ""
    }
]


  return (
    <div>
      <Navbar/>
      <div className={`${style.jumbotronCustom}`}>
          <Carousel>
              {
                items.map( (item, i) => <CarouselItem key={i} item={item} /> )
              }
          </Carousel>
      </div>
      <div className="container">
        <div className="home-content">

          <div className={`row ${style.lakukanImage}` }>
            <div className={`col-lg-6 col-12 text-center`}>
              <img src="https://media.discordapp.net/attachments/915505289174847510/1064440531389784074/Desktop_-_2.png?width=424&height=550"></img>
            </div>
            <div className="col-lg-6 col-12 d-flex align-items-center">
              <div>
                <h3>Apa yang kami lakukan?</h3>
                <p>Kami menjahit pakaian dengan spesialisasi menjahit batik. Kami menerima pesanan jahit kustom sesuai dengan permintaan pelanggan dan juga menjahit pakaian untuk dijual secara bebas.</p>
                <button>Selengkapnya</button>
              </div>
            </div>
          </div>

          <div className={`row ${style.jualImage}` }>
            <div className="col-lg-6 col-12 d-flex align-items-center">
              <div>
                <h3 className="text-right">Apa yang kami jual?</h3>
                <p className="text-right">Kami menjual produk berupa pakaian yang sudah jadi. Pakaian yang dijual adalah pakaian hasil jahitan dari UMKM kami dan juga desain kami pribadi. Kami juga membuka jasa jahit pakaian secara kustom.</p>
                <button className="float-right">Selengkapnya</button>
              </div>
            </div>
            <div className={`col-lg-6 col-12 text-center`}>
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