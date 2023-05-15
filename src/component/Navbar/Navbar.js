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
import { AiOutlineClose } from "react-icons/ai"

import AOS from 'aos';
import 'aos/dist/aos.css';

import Badge from '@mui/material/Badge';


function Navbar() {
    AOS.init();

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

    const [sidebar, setSidebar] = useState(false)

    const handleSidebar = () => {
        if (!sidebar) {
            setSidebar(true)
        } else if (sidebar) {
            setSidebar(false)
        }
    }


    return (
        
        <nav className="bg-white py-5 navbarCustom mb-5 sticky top-0 z-50" id="navBar">
            <div className="container mx-auto">
                <div className="flex justify-between items-center" >
                    <Link className="uppercase text-2xl navbar-brand" to="/">Sekar Galuh Etnic</Link>
                    <div className='hidden lg:flex justify-start gap-12 items-center'>
                        <div className="flex justify-start gap-7 items-center">
                            <Link className="border-b border-white hover:border-primary duration-200" to="/">Beranda</Link>
                            <Link className="border-b border-white hover:border-primary duration-200" to="/katalog">Katalog</Link>
                            <Link className="border-b border-white hover:border-primary duration-200" to="/jahit">Jahit</Link>
                            <Link className="border-b border-white hover:border-primary duration-200" to="/galeri">Galeri</Link>
                            <Link className="border-b border-white hover:border-primary duration-200" to="/tentangkami">Tentang Kami</Link>
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
                        <HiOutlineBars3BottomRight onClick={handleSidebar} className='cursor-pointer'/>
                    </div>

                    <div className={sidebar ? "block" : "hidden"}>
                        <div className='h-screen w-96 bg-primary fixed top-0 right-0 z-50 p-5 rounded-l-3xl'>
                            <AiOutlineClose onClick={handleSidebar} className='fill-white hover:fill-secondary2 duration-200 cursor-pointer'/>
                            <div>
                                <div className="grid gap-5 mt-10 text-white font-light mb-5">
                                    <Link className="hover:font-semibold border-b border-primary  hover:border-primary duration-200" to="/">Beranda</Link>
                                    <Link className="hover:font-semibold border-b border-primary  hover:border-primary duration-200" to="/katalog">Katalog</Link>
                                    <Link className="hover:font-semibold border-b border-primary  hover:border-primary duration-200" to="/jahit">Jahit</Link>
                                    <Link className="hover:font-semibold border-b border-primary  hover:border-primary duration-200" to="/galeri">Galeri</Link>
                                    <Link className="hover:font-semibold border-b border-primary  hover:border-primary duration-200" to="/tentangkami">Tentang Kami</Link>
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
                                            <BsCart2 className='fill-white w-5 h-5'/>
                                        </Badge>
                                    </Link>
                                    <Link className="" to="/profil"><VscAccount className='fill-white w-5 h-5'/></Link>
                                    <div className=''>
                                        <Link className="" onClick={() => {
                                            handleLogout(); 
                                            handleNavigate();
                                            window.location.reload(); }
                                            } 
                                            to="/"
                                        ><AiOutlineLogout className='fill-white w-5 h-5'/></Link>
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
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;