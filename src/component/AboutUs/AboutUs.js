import { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {useNavigate, Link} from "react-router-dom"

import { FiChevronRight } from "react-icons/fi"

import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client";

import Cookies from "js-cookie";

function AboutUs() {
    return(
        <div>
            <Navbar/>
            <div className="container mx-auto flex justify-start items-center gap-2">
                <Link className="" to="/"><p>SekarGaluhEtnic</p></Link>
                <FiChevronRight/>
                <p className="font-semibold">Tentang Kami</p>
            </div>

            <div className="container mx-auto my-14">
                <h2 className="text-4xl lg:text-6xl font-bold uppercase text-primary">TENTANG KAMI</h2>
                <div className="mt-14">
                    <div className="grid lg:grid-cols-7 gap-5">
                        <div className="col-span-2">
                            <img src="https://cdn.discordapp.com/attachments/915505289174847510/1107676044670009464/Group_133.png"></img>
                        </div>
                        <div className="col-span-5">
                            <p className="text-base"><span className="tracking-wider text-secondary uppercase text-2xl font-brand">Sekar Galuh Etnic</span>, merupakan UMKM yang menggeluti dibidang pakaian. Kami menjual produk jadi berupa pakaian seperti kemeja lengan pendek, kemeja lengan panjang, tunik, terusan, outer (luaran), jemputan, dan lain sebagainya. Kami juga menerima pesanan jahitan perorangan maupun pesanan jahitan secara massal</p>
                            <p className="text-base mt-4">Kami menamai UMKM ini dengan <span className="tracking-wider text-secondary uppercase text-xl font-brand">'Sekar Galuh Etnic'</span> dengan alasan yang sangat umum, yaitu <span className="tracking-wider text-secondary uppercase text-xl font-brand">'Sekar'</span> dan <span className="tracking-wider text-secondary uppercase text-xl font-brand">'Galuh'</span> diambil dari nama anak dari pemilik UMKM ini, serta <span className="tracking-wider text-secondary uppercase text-xl font-brand">'Etnic'</span> diambil dari kata etnik karena pemilik sangat menyukai yang berbau etnik dimana etnik itu sendiri berarti suatu kesatuan sosial yang bisa dibedakan dari kesatuan yang berlainan berdasarkan unsur kebudayaan yang mengakar kuat.</p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className="text-base">Awal mula terbentuknya UMKM ini adalah karena hobi pribadi pemilik. Diawali pada tahun 90-an pemilik hobi dengan menjahit diikuti dengan keluarga yang kental dengan adat Jawa, sehingga suka menjahit pakaian menggunakan kain tradisional seperti batik. Diawali dengan menjahit baju untuk dipakai pemiliki pribadi, berlanjut untuk keluarga dan kerabat dekat, hingga merasa percaya buka untuk umum dan menjadi supplier untuk beberapa butik. Hingga akhir tahun 2019, kami memiliki empat karyawan untuk membantu produksi. </p>
                    </div>
                </div>
                <div className="mt-20">
                    <h5 className="font-bold text-3xl text-secondary tracking-wide">KENALI PEMILIK KAMI</h5>
                    <div className="mt-10">
                        <img className="w-72 h-72 mx-auto" src="https://cdn.discordapp.com/attachments/915505289174847510/1107669149255225414/Group_132.png"></img>
                        <p className="mt-5 text-base">Beliau adalah <span className="font-semibold text-lg text-secondary">Dwi Novianti</span> yang merupakan pemilik dari UMKM Sekar Galuh Etnic. Lahir di Tulungagung Jawa Timur pada tahun 1965. Beliau adalah sosoknya teliti dalam mengerjakan segala hal. Beliau sangat cinta menajahit, oleh karenanya hasil jahitan beliau sangatlah baik karena didesain dan dijahit sepenuh hati.</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AboutUs