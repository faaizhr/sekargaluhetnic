import { useMutation } from "@apollo/client";
// import { GetMenu } from "../graphql/query";
import { InsertPemesananPakaian } from "../graphql/mutation";

export default function useInsertToPemesanan() {
    const [insertPemesananPakaian, {loading: loadingInsertPemesananPakaian}] = useMutation(InsertPemesananPakaian);

    return {
        insertPemesananPakaian,
        loadingInsertPemesananPakaian
    }
}