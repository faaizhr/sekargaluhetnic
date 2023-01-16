import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
// import ListItem from "../Menu/ListItem"
import Footer from "../Footer/Footer";
// import LoadingSvg from "../Menu/loadingSvg";
import {useNavigate} from "react-router-dom"

import style from './Galeri.module.css'
import { gql, useLazyQuery } from "@apollo/client";


function Galeri() {
    

    return(
        <div>
            <Navbar/>
            <h1>GALERI</h1>
            <Footer />
        </div>
    )
}

export default Galeri