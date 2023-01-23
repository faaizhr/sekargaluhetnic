import { gql } from '@apollo/client';

export const GetKatalog = gql `
query MyQuery {
  sekargaluhetnic_katalog {
    deskripsi
    foto
    harga
    id
    nama
  }
}
`;

export const GetAnotherKatalog = gql `
query MyQuery($_neq: Int!) {
  sekargaluhetnic_katalog(where: {id: {_neq: $_neq}}, limit: 4) {
    deskripsi
    foto
    harga
    id
    nama
  }
}
`;

export const GetKeranjangKatalog = gql `
query MyQuery($_eq: Int!) {
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

export const GetSumKeranjang = gql `
query MyQuery($_eq: Int!) {
  sekargaluhetnic_katalog_aggregate(where: {keranjangs: {user_id: {_eq: $_eq}}}) {
    aggregate {
      sum {
        harga
      }
    }
  }
}
`;

export const GetUserProfileData = gql `
query MyQuery($_eq: Int!) {
  sekargaluhetnic_user(where: {id: {_eq: $_eq}}) {
    email
    id
    name
    password
    telephone
    jenis_kelamin
    alamats {
      alamat
      id
      kabupaten_kota
      kecamatan
      kelurahan
      kodepos
      negara
      provinsi
      user_id
    }
  }
}
`



