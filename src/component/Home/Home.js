import Navbar from "../Navbar/Navbar";
import style from './Home.module.css'
// import useGetComicLatest from "../../hooks/useGetComicLatest";
// import useGetComicBest from "../../hooks/useGetBestMenu";
import useGetMenu from "../../hooks/useGetMenu";
import useGetBestMenu from "../../hooks/useGetBestMenu";
import ListItem from "../Katalog/ListItem";
import Footer from "../Footer/Footer";

function Home() {

  const {data: dataMenu, loading: loadingMenu, error} = useGetMenu()
  console.log("data latest di home", dataMenu)

  const {data: bestMenu, loading: loadingBestMenu, error: errorBestMenu} = useGetBestMenu() 
  console.log("data best", bestMenu)


  return (
    <div>
      <Navbar/>
      <div className={`jumbotron jumbotron-fluid ${style.jumbotronCustom}`}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center h-100">
                <div>
                  <p>CAROUSEL</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <img src=""></img>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="home-content">
        </div>
      </div>

      <div className="container">
        <h3 className="">New Release</h3>
        <div className={style.menuListBest}>
          {/* {bestMenu?.Chiliesious_menu.map((menu) => <ListItem key={menu.id} item={menu}/>)}
          { loadingMenu ? <LoadingSvg/> : ""} */}
        </div>
        <h3 className="mb-4 mt-5">Our Collection</h3>
        <div className={style.menuList}>
          {/* {dataMenu?.Chiliesious_menu.map((menu) => <ListItem key={menu.id} item={menu}/>)}
          { loadingMenu ? <LoadingSvg/> : ""} */}
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Home