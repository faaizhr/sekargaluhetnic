import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate} from "react-router-dom"

import style from './Profile.module.css'
import { gql, useLazyQuery } from "@apollo/client";


function Profile() {
    

    return(
        <div>
            <Navbar/>
            <div className="container">
              <h1>PROFIL</h1>
            </div>
            <Footer />
        </div>
    )
}

export default Profile