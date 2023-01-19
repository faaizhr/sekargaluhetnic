import { useMutation } from "@apollo/client";
import { DeleteCartItem } from "../graphql/mutation";

export default function useDeleteCartItem() {
    const [deleteItemCart, {loading: loadingDeleteItemCart}] = useMutation(DeleteCartItem);

    return {
        deleteItemCart,
        loadingDeleteItemCart
    }
}