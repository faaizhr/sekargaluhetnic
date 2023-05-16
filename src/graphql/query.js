import { gql } from '@apollo/client';

export const GetKatalog = gql `
query MyQuery {
  sekargaluhetnic_katalog {
    deskripsi
    foto
    harga
    id
    nama
    gender
    ukuran
    kode_produk
    material
    stok
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
  sekargaluhetnic_pesanan_jahit(where: {user_id: {_eq: $_eq}, foto_desains_aggregate: {count: {predicate: {_gt: 0}}}}, order_by: {id: desc}) {
    id
    jahit_session
    jenis_pakaian
    kain
    panjang_lengan
    user_id
    foto_desains {
      foto
      id
      pesanan_jahit_id
    }
    updated_at
    created_at
    deskripsi
    lebar_bahu
    lingkar_dada
    lingkar_kerung_lengan
    lingkar_leher
    lingkar_pergelangan_tangan
    lingkar_pinggang
    lingkar_pinggul
    ongkir
    opsi_pengiriman
    panjang_baju
    total_biaya
    status
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

export const GetPesananPakaianDetail = gql `
query MyQuery($_eq: Int!) {
  sekargaluhetnic_pesanan_pakaian(where: {id: {_eq: $_eq}}) {
    created_at
    id
    kode_pemesanan
    ongkir
    opsi_pengiriman
    pesanan_session
    status
    total_harga
    user_id
    user {
      email
      id
      jenis_kelamin
      name
      telephone
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
    pesanans {
      created_at
      id
      katalog_id
      pesanan_pakaian_id
      katalog {
        deskripsi
        foto
        gender
        harga
        id
        kode_produk
        material
        nama
        stok
        ukuran
      }
    }
    bukti_pembayaran
    metode_pembayaran
    nama_rekening_pemilik
  }
}
`

export const GetPesananJahitDetail = gql `
query MyQuery($_eq: Int!) {
  sekargaluhetnic_pesanan_jahit(where: {id: {_eq: $_eq}}) {
    created_at
    deskripsi
    foto_desains {
      foto
      id
      pesanan_jahit_id
      user_id
    }
    id
    jahit_session
    jenis_pakaian
    kain
    kode_pemesanan
    lebar_bahu
    lingkar_dada
    lingkar_kerung_lengan
    lingkar_leher
    lingkar_pergelangan_tangan
    lingkar_pinggang
    lingkar_pinggul
    metode_pembayaran
    nama_rekening_pemilik
    ongkir
    opsi_pengiriman
    panjang_baju
    panjang_lengan
    status
    bukti_pembayaran
    total_biaya
    updated_at
    user_id
    user {
      email
      id
      jenis_kelamin
      name
      telephone
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
  }
}

`



