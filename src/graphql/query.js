import { gql } from '@apollo/client';

export const GetMenu = gql `
query MyQuery {
  Chiliesious_menu (order_by: {id: asc}){
    deskripsi
    harga
    id
    nama_menu
    foto
    penjelasan
    komposisi
    comments {
      nama
      feedback
    }
  }
}
`;

export const GetBestMenu = gql `
query MyQuery {
  Chiliesious_menu(order_by: {id: asc}, limit: 2) {
    penjelasan
    nama_menu
    komposisi
    id
    harga
    foto
    deskripsi
    comments {
      nama
      feedback
    }
  }
}
`;

export const GetMenuDetail = gql `
query MyQuery($_eq: Int!) {
  Chiliesious_menu(where: {id: {_eq: $_eq}}) {
    nama_menu
    id
    harga
    deskripsi
    foto
    comments {
      nama
      feedback
    }
  }
}
`

export const GetAnotherMenu = gql `
query MyQuery($_neq: Int!) {
  Chiliesious_menu(where: {id: {_neq: $_neq}}, limit: 4) {
    nama_menu
    id
    harga
    foto
    deskripsi
    penjelasan
    komposisi
    comments {
      nama
      feedback
    }
  }
}
`



