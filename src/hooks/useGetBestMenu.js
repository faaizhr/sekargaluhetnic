import { useQuery } from "@apollo/client";
import { GetBestMenu } from "../graphql/query";

export default function useGetBestMenu() {
    const {data, loading, error} = useQuery(GetBestMenu);
    console.log("hook", data)

    return {
        data, 
        loading, 
        error
    }
}
