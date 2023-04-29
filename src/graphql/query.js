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

export const GetKain = gql `
query MyQuery {
  sekargaluhetnic_kain {
    id
    nama
    foto
    deskripsi
    harga
  }
}
`

export const GetPesananID = gql `
query MyQuery($_eq: String!) {
  sekargaluhetnic_pesanan_jahit(where: {jahit_session: {_eq: $_eq}}) {
    id
  }
}
`

export const GetPesananJahitUser = gql `
query MyQuery($_eq: Int!) {
  sekargaluhetnic_pesanan_jahit(where: {user_id: {_eq: $_eq}}) {
    id
    jahit_session
    jenis_pakaian
    kain
    panjang_lengan
    ukuran_leher
    user_id
    foto_desains {
      foto
      id
      pesanan_jahit_id
    }
    updated_at
    created_at
  }
}
`

export const GetPesananPakaian = gql `
query MyQuery {
  sekargaluhetnic_pesanan_pakaian {
    id
    katalog_id
    ongkir
    status
    katalog {
      deskripsi
      foto
      gender
      harga
      id
    }
    user {
      email
      id
      jenis_kelamin
      name
      alamats {
        alamat
        id
        kabupaten_kota
        kecamatan
        kelurahan
        kodepos
        negara
        provinsi
      }
    }
    chats {
      id
      message
      pesanan_pakaian_id
    }
  }
}
`



