// import firebase from 'firebase/compat/app';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../config';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// type ContextProps = {
//     currentUser: firebase.User | null;
//     setCurrentUser:any;
//     user:null;
//     username:null;
// }

// export const AuthContext = createContext<Partial<ContextProps>>({
//     user:null,
//     username:null,
// });

// export function useAuth(){
//     return useContext(AuthContext);
// }

// export function AuthProvider({children}:any){
//     const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

//     const googleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     await signInWithPopup(auth, provider);
//     };


//     function signup(email:string, password:string){
//         return auth.createUserWithEmailAndPassword(email, password);
//     }
//     function login(email:string, password:string){
//         return auth.signInWithEmailAndPassword(email, password);
//     }
//     function resetPassword(email:string){
//         return auth.sendPasswordResetEmail(email);
//     }

//     useEffect(()=>{
//         const unsubscribe = firebase.auth().onAuthStateChanged((user:any) => setCurrentUser(user));
//         return unsubscribe;
//     },[])

//     const value = {
//         currentUser,
//         signup,
//         login,
//         resetPassword
//     }
//     return (
//         <AuthContext.Provider value={value} >
//             {children}
//         </AuthContext.Provider>
//     )
// }