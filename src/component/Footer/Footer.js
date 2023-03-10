import { Link } from 'react-router-dom'
import style from './Footer.module.css'

function Footer() {

    return (
        <div className={`mt-5 ${style.footer}`}>
            <div className="container pt-4">
                <div className='row mt-5 mb-5'>
                    <div className='col-lg-4 col-sm-12'>
                        <h6><span className={style.textLogo}>Sekar Galuh Etnic</span></h6>
                        <p>UMKM di bidang pakaian. Kami menjual produk berupa pakaian yang sudah jadi yang kami jahit dan desain sendiri serta kami menerima pemesanan pakaian secara custom</p>
                    </div>
                    <div className='col-lg-4 col-sm-12'>
                        <h6>Hubungi Kami</h6>
                        <div>
                            <i className="bi bi-telephone d-inline"></i>
                            <p className='d-inline ms-3'>082288062499</p>
                        </div>
                        <div>
                            <i className="bi bi-geo-alt d-inline"></i>
                            <p className='d-inline ms-3'>Pondok Labu, Jakarta Selatan, DKI Jakarta</p>
                        </div>
                        <div>
                            <i className="bi bi-envelope"></i>
                            <p className='d-inline-block ms-3'>sekargaluhetnic@gmail.com</p>
                        </div>
                    </div>
                    <div className='col-lg-4 col-sm-12'>
                        <h6>Ikuti Kami</h6>
                        <div className={style.logo}>
                            <div className={style.instagramLogo}>
                                <a href="https://www.instagram.com/chiliesious/" target="_blank"><i className="bi bi-instagram me-4"></i></a>
                            </div>
                            <div className={style.whatsappLogo}>
                                <a href="https://wa.me/6282288062499?text=Hai%20terima%20kasih%20sudah%20mengunjungi%20website%20chiliesious.%20Chilie%20lovers%20mau%20pesan%20yang%20varian%20apa%20nih%3F%3F" target="_blank"><i className="bi bi-whatsapp me-4"></i></a>
                            </div>
                            <div className={style.shopeeLogo}>
                                <a href="https://shopee.co.id/chiliesious" target="_blank"><i className="bi bi-bag-fill me-4"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.copyright}>
                    <p>Copyright ?? 2022-2023 SekarGaluhEtnic All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer