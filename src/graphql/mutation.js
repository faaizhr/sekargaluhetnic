import { gql } from "@apollo/client";

export const InsertComment = gql `
mutation MyMutation($feedback: String!, $nama: String!, $menu_id: Int!) {
  insert_Chiliesious_comment(objects: {nama: $nama, feedback: $feedback, menu_id: $menu_id}) {
    affected_rows
  }
}
`;