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