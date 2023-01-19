import { useQuery, useLazyQuery } from "@apollo/client";
import { GetAnotherKatalog } from "../graphql/query"; 

export default function useGetAnotherKatalog() {
    const [getAnotherKatalog, {data, loading, error}] = useLazyQuery(GetAnotherKatalog);
    console.log( data)

    return {
        GetAnotherMenu,
        data, 
        loading, 
        error
    }
}