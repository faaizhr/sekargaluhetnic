import { useQuery, useLazyQuery, useSubscription } from "@apollo/client";
import { SubscriptionPesanan } from "../graphql/subscription";

export default function useSubscriptionPesanan() {
    const {data, loading, error} = useSubscription(SubscriptionPesanan);
    console.log("data langganan", data)

    return {
        data, 
        loading, 
        error
    }
}