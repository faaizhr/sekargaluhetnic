import { useQuery, useLazyQuery } from "@apollo/client";
import { GetAnotherMenu } from "../graphql/query";

export default function useGetAnotherMenu() {
    const [getAnotherMenu, {data, loading, error}] = useLazyQuery(GetAnotherMenu);
    console.log( data)

    return {
        GetAnotherMenu,
        data, 
        loading, 
        error
    }
}