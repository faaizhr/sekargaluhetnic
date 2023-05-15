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
import SuntingAlamat from './component/Profile/suntingAlamat';
import Pesanan from './component/Pesanan/pesanan';
import PesananDetail from './component/Pesanan/pesananDetail';
import PesananJahitDetail from './component/Pesanan/pesananJahitDetail';
import PesananJahit from './component/Pesanan/pesananJahit';

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
        <Route exact path='/sunting-alamat' element={<SuntingAlamat />}/>
        <Route exact path='/pesanan-pakaian' element={<Pesanan />}/>
        <Route exact path='/pesanan-jahit' element={<PesananJahit />}/>
        <Route exact path='/pesanan-pakaian/:id' element={<PesananDetail />}/>
        <Route exact path='/pesanan-jahit/:id' element={<PesananJahitDetail />}/>
      </Routes>
    </Router>
  );
}

export default App;
