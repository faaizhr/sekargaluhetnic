import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { SubscriptionCart } from '../../graphql/subscription';
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import Cookies from "js-cookie";
import './Navbar.css'

import { VscAccount } from "react-icons/vsc"
import { BsCart2 } from "react-icons/bs"
import { AiOutlineLogout } from "react-icons/ai"
import { TfiReceipt } from "react-icons/tfi"

import Badge from '@mui/material/Badge';


function Navbar() {

    const navigate = useNavigate();

    const LoggedIn = Cookies.get("token")

    const handleLogout =  () => {
        Cookies.remove('okogaye');
        Cookies.remove('token');
    }
    const handleNavigate = () => {
        navigate("/");
    }


    const {data, loading, error} = useSubscription(SubscriptionCart, {variables: { _eq: Cookies.get("okogaye")}})
    
    const cartLength = data?.sekargaluhetnic_keranjang?.length


    return (
        <nav className={`navbar navbar-expand-lg navbar-light sticky-top navbarCustom`} id="navBar">
            <div className="container">
                <Link className="navbar-brand" to="/">Sekar Galuh Etnic</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link me-3" to="/">Beranda</Link>
                    <Link className="nav-link me-3" to="/katalog">Katalog</Link>
                    <Link className="nav-link me-3" to="/galeri">Galeri</Link>
                    <Link className="nav-link me-5" to="/tentangkami">Tentang Kami</Link>
                </div>
                {LoggedIn && 
                <div className=''>
                    <Link className="me-4" to="/keranjang">
                        <Badge 
                        color="success"
                        badgeContent={cartLength}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        >
                            <BsCart2/>
                        </Badge>
                    </Link>
                    <Link className="me-4" to="/profil"><VscAccount/></Link>
                    {/* <Link className="me-4" to="/profil"><TfiReceipt/></Link> */}
                    <div className='d-inline logout'>
                        <Link className="" onClick={() => {
                            handleLogout(); 
                            handleNavigate();
                            window.location.reload(); }
                            } 
                            to="/"
                        ><AiOutlineLogout/></Link>
                    </div>
                </div>
                }
                {!LoggedIn && 
                <div className='loginButton'>
                    <Link to="/login">
                        <button>Masuk</button>
                    </Link>
                </div>
                }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;