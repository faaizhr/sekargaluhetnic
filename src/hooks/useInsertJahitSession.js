import { useMutation } from "@apollo/client";
// import { GetMenu } from "../graphql/query";
import { InsertJahitBajuSession } from "../graphql/mutation";

export default function useInsertJahitSession() {
    const [insertJahitSession, {loading: loadingJahitSession}] = useMutation(InsertJahitBajuSession);

    return {
        insertJahitSession,
        loadingJahitSession
    }
}