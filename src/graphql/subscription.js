import { gql } from "@apollo/client";

export const SubscriptionMenu = gql `
subscription MySubscription {
  Chiliesious_menu {
    nama_menu
    id
    harga
    foto
    penjelasan
    deskripsi
    comments {
      nama
      feedback
    }
  }
}
`;