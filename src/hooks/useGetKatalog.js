import { useQuery } from "@apollo/client";
import { GetKatalog } from "../graphql/query";

export default function useGetKatalog() {
    const {data, loading, error} = useQuery(GetKatalog);
    console.log("hook", data)

    return {
        data, 
        loading, 
        error
    }
}
