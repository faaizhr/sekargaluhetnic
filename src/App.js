import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';
import Home from './component/Home/Home'
// import Login from './component/Login';
import ListComic from './component/Galeri/Galeri';
import Register from './component/Register/register';
import Login from './component/Login/login';
import Katalog from './component/Katalog/Katalog';
import Jahit from './component/Jahit/jahit';
import JahitOnline from './component/Jahit/jahitOnline';
import KatalogDetail from './component/Katalog/KatalogDetail';
import AboutUs from './component/AboutUs/AboutUs';
import Galeri from './component/Galeri/Galeri';
import Keranjang from './component/Keranjang/keranjang';
import Pemesanan from './component/Pemesanan/pemesanan';
import Profile from './component/Profile/profile';
import Alamat from './component/Profile/alamat';

import Navbar from './component/Navbar/Navbar';

function App() {
  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        {/* <Route exact path='/' element={<Login />}/> */}
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/katalog' element={<Katalog />}/>
        <Route exact path='/jahit' element={<Jahit />}/>
        <Route exact path='/jahit-online' element={<JahitOnline />}/>
        <Route exact path='/menu/:id' element={<KatalogDetail />}/>
        <Route exact path='/keranjang' element={<Keranjang />}/>
        <Route exact path='/pemesanan' element={<Pemesanan />}/>
        <Route exact path='/galeri' element={<Galeri />}/>
        <Route exact path='/tentangkami' element={<AboutUs />}/>
        <Route exact path='/profil' element={<Profile />}/>
        <Route exact path='/alamat' element={<Alamat />}/>
      </Routes>
    </Router>
  );
}

export default App;
