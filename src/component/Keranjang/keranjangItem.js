import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client";
import style from './keranjang.module.css'


import { MdDeleteOutline } from "react-icons/md"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { DeleteCartItem } from "../../graphql/mutation";
import { GetKeranjangKatalog } from "../../graphql/query";
import Cookies from "js-cookie";

const KeranjangItem = ({items}) => {

    // console.log("cek item", items)


    // const {data, loading, error} = useQuery(GetKeranjangKatalog, {variables: { _eq: Cookies.get("okogaye") }})

    const [deleteItemCart, {loading: loadingDeleteItemCart}] = useMutation(DeleteCartItem, {refetchQueries: [GetKeranjangKatalog]});
    const { id, nama, harga, foto, deskripsi} = items

    const navigate = useNavigate()
    
    const handleDetail = () => {
        navigate(`/menu/${items.id}`, {
            state: {
                id: items.id,
                nama: items.nama,
                harga: items.harga,
                deskripsi: items.deskripsi,
                foto: items.foto
            }
        })
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelectDelete = (id) => {
      console.log("cek id", id)
    }

    const handleDeleteCartItem = () => {
      // console.log("katalog yg terhapus", id)
      // console.log("katalog yg terhapus", parseInt(user_id))
      deleteItemCart({
        variables: {
          _eq: parseInt(Cookies.get("okogaye")),
          _eq1: id
        }
      })
    }

    // const style = {
    //   position: 'absolute',
    //   top: '50%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)',
    //   width: 400,
    //   bgcolor: 'background.paper',
    //   border: '2px solid #000',
    //   boxShadow: 24,
    //   p: 4,
    // };

    // console.log("cek rating avg di listitem", ratings_aggregate)
    
    return (
      <div className={`mb-4 ${style.menuKeranjangItem}`}>
        <div className={`mb-3 pb-4 ${style.cardKeranjang}`}>
          <div className="row g-0">
            <div className="col-sm-4">
              <img src={foto} className="img-fluid rounded-start" alt="..."/>
            </div>
            <div className="col-sm-8">
              <div className="card-body">
                <h5 className="">{nama}</h5>
                <p className="mb-3 fw-bold text-muted">Kode Produk : 78568HSJ4</p>
                <p className={`mb-1 ${style.semiBold}`}>Ukuran</p>
                <p className="mb-1">Lebar Tubuh</p>
                <p className="mb-1">Panjang Tubuh</p>
                <p className="mb-1">Panjang Lengan</p>
                <h6 className="mt-4">Rp{harga.toLocaleString()}</h6>
                <div className={style.deleteButton}>
                  <MdDeleteOutline onClick={() => {
                    handleOpen()
                    handleSelectDelete(id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={style.modalDeleteCartItem}>
            <h6 id="modal-modal-title" variant="h6" component="h2">HAPUS PRODUK</h6>
            <p id="modal-modal-description" sx={{ mt: 2 }}>Anda yakin ingin menghapus produk ini dari keranjang?</p>
            <div className="d-flex justify-content-start">
              <div className={`me-3 ${style.primaryButton}`}>
                <button onClick={() => handleDeleteCartItem(id)}>HAPUS</button>
              </div>
              <div className={style.secondaryButton}>
                <button onClick={handleClose}>BATALKAN</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
    
}

export default KeranjangItem