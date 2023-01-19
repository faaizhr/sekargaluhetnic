import { useMutation } from "@apollo/client";
// import { GetMenu } from "../graphql/query";
import { InsertToCart } from "../graphql/mutation";

export default function useInsertToCart() {
    const [insertToCart, {loading: loadingInsertComment}] = useMutation(InsertToCart);

    return {
        insertToCart,
        loadingInsertComment
    }
}