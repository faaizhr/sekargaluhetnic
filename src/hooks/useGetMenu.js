import { useQuery } from "@apollo/client";
import { GetMenu } from "../graphql/query";

export default function useGetMenu() {
    const {data, loading, error} = useQuery(GetMenu);
    console.log("hook", data)

    return {
        data, 
        loading, 
        error
    }
}
