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

export const SubscriptionSumKeranjang = gql `
subscription MySubscription($_eq: Int!) {
  sekargaluhetnic_katalog_aggregate(where: {keranjangs: {user_id: {_eq: $_eq}}}) {
    aggregate {
      sum {
        harga
      }
    }
  }
}
`;

export const SubscriptionPesanan = gql `
subscription MySubscription($_eq: Int!) {
  sekargaluhetnic_pesanan_pakaian(where: {user_id: {_eq: $_eq}, pesanans_aggregate: {count: {predicate: {_gt: 0}}}}, order_by: {id: desc}) {
    id
    ongkir
    pesanan_session
    status
    user_id
    created_at
    total_harga
    pesanans {
      id
      katalog_id
      katalog {
        deskripsi
        foto
        gender
        harga
        id
        nama
      }
      pesanan_pakaian_id
    }
    chats {
      id
      message
      pesanan_pakaian_id
      user_id
    }
    user {
      email
      id
      jenis_kelamin
      name
      alamats {
        alamat
        kabupaten_kota
        kecamatan
        kelurahan
        kodepos
        negara
        provinsi
      }
    }
  }
}
`