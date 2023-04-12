import { useMutation } from "@apollo/client";
// import { GetMenu } from "../graphql/query";
import { InsertChat } from "../graphql/mutation";

export default function useInsertChat() {
    const [insertChat, {loading: loadingInsertChat}] = useMutation(InsertChat);

    return {
        insertChat,
        loadingInsertChat
    }
}