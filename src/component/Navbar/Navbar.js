import { Link } from 'react-router-dom'
import './Navbar.css'

import { CgProfile } from "react-icons/cg"

function Navbar() {


    return (
        <nav className={`navbar navbar-expand-lg navbar-light sticky-top navbarCustom`} id="navBar">
            <div className="container">
                <Link className="navbar-brand" to="/">Sekar Galuh Etnic</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link me-3" to="/">Home</Link>
                    <Link className="nav-link me-3" to="/katalog">Katalog</Link>
                    <Link className="nav-link me-3" to="/galeri">Galeri</Link>
                    <Link className="nav-link me-3" to="/tentangkami">Tentang Kami</Link>
                    <CgProfile></CgProfile>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;