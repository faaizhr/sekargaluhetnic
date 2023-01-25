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
mutation MyMutation($_eq: String = "", $jenis_pakaian: String!, $kain: String!, $panjang_lengan: Int!, $ukuran_leher: Int!) {
  update_sekargaluhetnic_pesanan_jahit(where: {jahit_session: {_eq: $_eq}}, _set: {jenis_pakaian: $jenis_pakaian, kain: $kain, panjang_lengan: $panjang_lengan, ukuran_leher: $ukuran_leher}) {
    affected_rows
  }
}
`;
// { VARIABLES YANG DIPERLUKAN
//   "_eq": "f9497cc0-9abe-11ed-8b3c-796cbcf6a7c6",
//   "jenis_pakaian": "Gaun",
//   "kain": "Batik",
//   "panjang_lengan": 55
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