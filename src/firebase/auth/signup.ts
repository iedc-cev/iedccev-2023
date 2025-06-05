import {auth} from "../config";
import { signInWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";


export default async function signIn(email: string, password: string): Promise<{result: UserCredential | null, error: any | null}> {
    let result: UserCredential | null = null,
        error: any = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}