import { gql } from "@apollo/client";

export const SubscriptionCart = gql `
subscription MySubscription($_eq: Int!) {
  sekargaluhetnic_keranjang(where: {user_id: {_eq: $_eq}}) {
    user_id
    katalog_id
    id
    katalog {
      deskripsi
      foto
      gender
      harga
      id
      nama
    }
  }
}
`;

export const SubscriptionKeranjangKatalog = gql `
subscription MySubscription($_eq: Int!) {
  sekargaluhetnic_katalog(where: {keranjangs: {user_id: {_eq: $_eq}}}) {
    deskripsi
    foto
    gender
    harga
    id
    nama
  }
}
`;