import { useMutation } from "@apollo/client";
import { GetMenu } from "../graphql/query";
import { InsertComment } from "../graphql/mutation";

export default function useInsertComment() {
    const [insertComment, {loading: loadingInsertComment}] = useMutation(InsertComment, {refetchQueries: GetMenu});

    return {
        insertComment,
        loadingInsertComment
    }
}