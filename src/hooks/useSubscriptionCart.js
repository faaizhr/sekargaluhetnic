import { useQuery, useLazyQuery, useSubscription } from "@apollo/client";
import { SubscriptionCart } from "../graphql/subscription";

export default function useSubscriptionCart() {
    const {data, loading, error} = useSubscription(SubscriptionCart);
    console.log("data langganan", data)

    return {
        data, 
        loading, 
        error
    }
}