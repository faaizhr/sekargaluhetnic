import { gql } from "@apollo/client";

export const InsertToCart = gql `
mutation MyMutation($user_id: Int!, $katalog_id: Int!) {
  insert_sekargaluhetnic_keranjang_one(object: {user_id: $user_id, katalog_id: $katalog_id}) {
    id
    katalog_id
    user_id
  }
}
`;

export const DeleteCartItem = gql `
mutation MyMutation($_eq: Int!, $_eq1: Int!) {
  delete_sekargaluhetnic_keranjang(where: {user_id: {_eq: $_eq}, katalog_id: {_eq: $_eq1}}){
    affected_rows
  }
}
`;

export const InsertJahitBajuSession = gql `
mutation MyMutation($jahit_session: String!, $user_id: Int!) {
  insert_sekargaluhetnic_pesanan_jahit(objects: {jahit_session: $jahit_session, user_id: $user_id}) {
    affected_rows
  }
}
`;

export const UpdateJahitBaju = gql `
mutation MyMutation($_eq: String = "", $jenis_pakaian: String!, $kain: String!, $panjang_lengan: Int!, $lebar_bahu: Int!, $lingkar_dada: Int!, $lingkar_kerung_lengan: Int!, $lingkar_leher: Int!, $lingkar_pergelangan_tangan: Int!, $lingkar_pinggang: Int!, $lingkar_pinggul: Int!, $ongkir: Int!, $opsi_pengiriman: String!, $panjang_baju: Int!, $updated_at: String!, $deskripsi: String!, $total_biaya: Int!, $status: String!, $created_at: String!) {
  update_sekargaluhetnic_pesanan_jahit(where: {jahit_session: {_eq: $_eq}}, _set: {jenis_pakaian: $jenis_pakaian, kain: $kain, panjang_lengan: $panjang_lengan, lebar_bahu: $lebar_bahu, lingkar_dada: $lingkar_dada, lingkar_kerung_lengan: $lingkar_kerung_lengan, lingkar_leher: $lingkar_leher, lingkar_pergelangan_tangan: $lingkar_pergelangan_tangan, lingkar_pinggang: $lingkar_pinggang, lingkar_pinggul: $lingkar_pinggul, ongkir: $ongkir, opsi_pengiriman: $opsi_pengiriman, panjang_baju: $panjang_baju, updated_at: $updated_at, deskripsi: $deskripsi, total_biaya: $total_biaya, status: $status, created_at: $created_at}) {
    affected_rows
  }
}


`;
// {
//   "_eq": "53ef03d0-ed6b-11ed-a8d8-63b9408f3970",
//   "jenis_pakaian": "Gaun",
//   "kain": "Batik Cirebon",
//   "lebar_bahu": 22,
//   "lingkar_dada": 33,
//   "lingkar_leher": 21,
//   "lingkar_pinggul": 22,
//   "lingkar_pinggang": 12,
//   "lingkar_kerung_lengan": 43,
//   "lingkar_pergelangan_tangan": 21,
//   "panjang_baju": 40,
//   "panjang_lengan": 50,
//   "ongkir": 20000,
//   "opsi_pengiriman": "Reguler",
//   "deskripsi": "halogalo",
//   "updated_at": "tanggal",
//   "created_at": "Date()"
//   "total_biaya": 12000,
// }


export const InsertFotoDesainJahit = gql `
mutation MyMutation($objects: [sekargaluhetnic_foto_desain_insert_input!] = {}) {
  insert_sekargaluhetnic_foto_desain(objects: $objects) {
    affected_rows
  }
}
`;
// "objects": [ VARIABLES YANG DIPERLUKAN
//   {
//     "foto": "https//inimisalnya_link_foto12837934.firebase.com",
//     "pesanan_jahit_id": 8,
//     "user_id": 2
//   },
//   {
//     "foto": "https//inimisalnya_link_foto66548456.firebase.com",
//     "pesanan_jahit_id": 8,
//     "user_id": 2
//   }
// ]
// }

export const InsertPemesananFromKeranjang = gql `
mutation MyMutation($ongkir: Int!, $status: String!, $user_id: Int!, $pesanan_session: String!, $created_at: String!) {
  insert_sekargaluhetnic_pesanan_pakaian(objects: {ongkir: $ongkir, status: $status, user_id: $user_id, pesanan_session: $pesanan_session, created_at: $created_at}) {
    affected_rows
  }
}
`;
// {
//   "ongkir": 13000,
//   "status": "Lunas",
//   "user_id": 2,
//   "pesanan_session": "shdajsdas-dsa9d8as-sda"
//   "created_at": text,
// }


export const InsertPemesananPakaian = gql `
mutation MyMutation($objects: [sekargaluhetnic_pesanan_insert_input!] = {}) {
  insert_sekargaluhetnic_pesanan(objects: $objects) {
    affected_rows
  }
}
`;
// {
//   "objects": [
//     {
//       "katalog_id": 1,
//       "pesanan_pakaian_id": 14
//     },
//     {
//       "katalog_id": 2,
//       "pesanan_pakaian_id": 14
//     }
//   ]
// }

export const UpdatePemesananPakaian = gql `
mutation MyMutation($id: Int!, $ongkir: Int!, $total_harga: Int!, $created_at: String!, $opsi_pengiriman: String!) {
  update_sekargaluhetnic_pesanan_pakaian_by_pk(pk_columns: {id: $id}, _set: {ongkir: $ongkir, total_harga: $total_harga, created_at: $created_at, opsi_pengiriman: $opsi_pengiriman}) {
    id
  }
}
`
// {
//   "id": 46,
//   "ongkir": 9000,
//   "total_harga": 500000,
//   "created_at": "jumat",
//   "opsi_pengiriman": "Cepat"
// }

export const InsertChat = gql `
mutation MyMutation($object: sekargaluhetnic_chat_insert_input = {}) {
  insert_sekargaluhetnic_chat_one(object: $object) {
    id
  }
}
`
// {  VARIABLES YANG DIPERLUKAN
//   "object": {
//     "pesanan_pakaian_id": 8,
//     "user_id": 3,
//     "message": "balas chat"
//   }
// }

export const InsertChatJahit = gql `
mutation MyMutation($object: sekargaluhetnic_chat_jahit_insert_input = {}) {
  insert_sekargaluhetnic_chat_jahit_one(object: $object) {
    id
  }
}
`
// {
//   "object": {
//     "pesanan_jahit_id": 30,
//     "user_id": "2",
//     "message": "halo lagi"
//   }
// }

export const InsertAlamat = gql `
mutation MyMutation($objects: [sekargaluhetnic_alamat_insert_input!] = {}) {
  insert_sekargaluhetnic_alamat(objects: $objects) {
    affected_rows
  }
}
`
// {  VARIABLES YANG DIPERLUKAN
//   "objects": {
//     "negara": "Indonesia",
//     "provinsi": "DKI Jakarta",
//     "kabupaten_kota": "Jakarta Selatan",
//     "kecamatan": "Kebayoran Baru",
//     "kelurahan": "Gandaria Utara",
//     "alamat": "Jalan Bumi No.20",
//     "kodepos": 16120,
//     "user_id": 3
//   }
// }

export const UpdateAlamat = gql `
mutation MyMutation($_eq: Int!, $_set: sekargaluhetnic_alamat_set_input = {}) {
  update_sekargaluhetnic_alamat(where: {user_id: {_eq: $_eq}}, _set: $_set) {
    affected_rows
  }
}
`
// {  VARIABLES YANG DIPERLUKAN
//   "_eq": 2,
//   "_set": {
//     "negara": "Indonesia",
//     "provinsi": "DKI Jakarta",
//     "kabupaten_kota": "Jakarta Selatan",
//     "kecamatan": "Kebayoran Baru",
//     "kelurahan": "Pulo",
//     "alamat": "Jalan Grinting 3 No. 33",
//     "kodepos": 16433 
//   }
// }

export const UpdateProfil = gql `
mutation MyMutation($_eq: Int!, $telephone: String!, $name: String!, $jenis_kelamin: String!, $email: String!) {
  update_sekargaluhetnic_user(where: {id: {_eq: $_eq}}, _set: {telephone: $telephone, name: $name, jenis_kelamin: $jenis_kelamin, email: $email}) {
    affected_rows
  }
}
`
// {
//   "_eq": 4,
//   "telephone": "123456789",
//   "name": "Rama Gio",
//   "jenis_kelamin": "Pria",
//   "email": "rama@gmail.com"
// }

export const UploadPembayaranPesananPakaian = gql `
mutation MyMutation($_eq: Int!, $bukti_pembayaran: String!, $nama_rekening_pemilik: String!, $metode_pembayaran: String!) {
  update_sekargaluhetnic_pesanan_pakaian(where: {id: {_eq: $_eq}}, _set: {bukti_pembayaran: $bukti_pembayaran, nama_rekening_pemilik: $nama_rekening_pemilik, metode_pembayaran: $metode_pembayaran, status: "Pembayaran Diproses"}) {
    affected_rows
  }
}
`
// {
//   "_eq": 66,
//   "bukti_pembayaran": "tes",
//   "nama_rekening_pemilik": "faiz",
//   "metode_pembayaran": "bca"
// }

export const UploadPembayaranPesananJahit = gql `
mutation MyMutation($_eq: Int!, $bukti_pembayaran: String!, $metode_pembayaran: String!, $nama_rekening_pemilik: String!) {
  update_sekargaluhetnic_pesanan_jahit(where: {id: {_eq: $_eq}}, _set: {metode_pembayaran: $metode_pembayaran, nama_rekening_pemilik: $nama_rekening_pemilik, bukti_pembayaran: $bukti_pembayaran, status: "Pembayaran Diproses"}) {
    affected_rows
  }
}

`