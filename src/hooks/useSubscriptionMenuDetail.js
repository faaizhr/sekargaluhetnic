import { useQuery, useLazyQuery, useSubscription } from "@apollo/client";
import { GetMenuDetail } from "../graphql/query"; 
import { SubscriptionMenu } from "../graphql/subscription";

export default function useSubscriptionMenuDetail() {
    const {data, loading, error} = useSubscription(SubscriptionMenu);
    console.log("data langganan", data)

    return {
        data, 
        loading, 
        error
    }
}