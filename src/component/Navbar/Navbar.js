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
import { HiOutlineBars3BottomRight } from "react-icons/hi2"

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
        <nav className="bg-white py-3 navbarCustom mb-5" id="navBar">
            <div className="container mx-auto">
                <div className="flex justify-between items-center" >
                    <Link className="uppercase text-2xl navbar-brand" to="/">Sekar Galuh Etnic</Link>
                    <div className='hidden lg:flex justify-start gap-12 items-center'>
                        <div className="flex justify-start gap-7 items-center">
                            <Link className="" to="/">Beranda</Link>
                            <Link className="" to="/katalog">Katalog</Link>
                            <Link className="" to="/galeri">Galeri</Link>
                            <Link className="" to="/tentangkami">Tentang Kami</Link>
                        </div>
                        {LoggedIn && 
                        <div className='flex justify-start gap-5 items-center'>
                            <Link className="" to="/keranjang">
                                <Badge 
                                color="success"
                                badgeContent={cartLength}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                >
                                    <BsCart2 className='w-5 h-5'/>
                                </Badge>
                            </Link>
                            <Link className="" to="/profil"><VscAccount className='w-5 h-5'/></Link>
                            <div className=''>
                                <Link className="" onClick={() => {
                                    handleLogout(); 
                                    handleNavigate();
                                    window.location.reload(); }
                                    } 
                                    to="/"
                                ><AiOutlineLogout className='w-5 h-5'/></Link>
                            </div>
                        </div>
                        }
                        {!LoggedIn && 
                        <div className='bg-secondary text-white px-3 py-2 rounded-md border border-secondary hover:bg-white hover:text-secondary duration-200'>
                            <Link to="/login">
                                <button>Masuk</button>
                            </Link>
                        </div>
                        }
                    </div>
                    <div className='block lg:hidden'>
                        <HiOutlineBars3BottomRight/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;