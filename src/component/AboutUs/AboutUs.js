import Navbar from "../Navbar/Navbar"
import style from "./About.module.css"
import Footer from "../Footer/Footer"
import VisiImage from "./img/visi.jpg"
import MisiImage from "./img/misi.jpg"

import ProfileAvatar from "./img/profileimg.png"

function AboutUs() {
    return(
        <div>
            <Navbar/>
            <h1>TENTANG KAMI</h1>
            <Footer/>
        </div>
    )
}

export default AboutUs