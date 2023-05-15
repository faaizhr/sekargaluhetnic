import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate, Link} from "react-router-dom"

import { FiChevronRight } from "react-icons/fi"

import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client";

import { GetUserProfileData } from "../../graphql/query";
import { GetPesananJahitUser } from '../../graphql/query';
import { SubscriptionPesanan } from "../../graphql/subscription";



import Cookies from "js-cookie";


function Galeri() {
    

    return(
        <div>
            <Navbar/>
            <div className="container mx-auto flex justify-start items-center gap-2">
                <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
                <FiChevronRight/>
                <p className="font-semibold">Galeri</p>
            </div>

            <div className="container mx-auto mt-14">
                <h2 className="text-4xl lg:text-6xl font-bold text-primary uppercase">GALERI</h2>
                <div className="grid lg:grid-cols-2 gap-5 mt-20">
                    <img className="rounded-md" src="https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Gallery%2FIMG_2743.png?alt=media&token=789ba81d-b8ab-4675-ae8a-e9e2e3e6d3e4"></img>
                    <img className="rounded-md" src="https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Gallery%2FIMG_2745.png?alt=media&token=bee555e3-fb67-4fae-a31b-2e3a7bc9b698"></img>
                </div>
                <div className="grid lg:grid-cols-3 mt-10 gap-10">
                    <img className="rounded-md" src="https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Katalog%2FIMG_2790.png?alt=media&token=7eff1454-20b9-4d68-ac9c-989c052934d7"></img>
                    <img className="rounded-md" src="https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Katalog%2FIMG_2799.png?alt=media&token=e15ba077-905c-4e65-940e-61730108fa6a"></img>
                    <img className="rounded-md" src="https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Katalog%2FIMG_2793.png?alt=media&token=e4185aab-0bda-4aa0-a508-9c3bd413ab2d"></img>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Galeri