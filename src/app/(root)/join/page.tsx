"use client";
import Form from "@/components/Form";
import { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { User } from "firebase/auth";
import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";

const Onboard = () => {
  const router = useRouter();
  const userAuth = UserAuth();
  const user = userAuth?.user;
  const googleSignIn = userAuth?.googleSignIn;
  const logOut = userAuth?.logOut;
  const [loading, setLoading] = useState(true);
  const [onboarded, setOnboarded] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn!();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut!();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuthentication();
  }, [user]);
  useEffect(() => {
    async function isOnboarded() {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if (docSnap.exists()) {
          setOnboarded(true);
          router.push("/profile");
        } else {
          setOnboarded(false);
        }
      }
    }
    isOnboarded();
  }, [router, user]);

  return (
    <div className="">
      {loading ? (
        <Spinner />
      ) : user ? (
        // <p>
        //   Welcome, {user.displayName} - you are logged in to the profile page -
        //   a protected route.
        // </p>
        <div className="bg-white">
          <Form />
        </div>
      ) : (
        // <p>You must be logged in to view this page - protected route.</p>
        // <ul className="flex h-screen w-screen justify-center items-center">
        //   <li onClick={handleSignIn} className="p-2 cursor-pointer">
        //     Login
        //   </li>
        //   <li onClick={handleSignIn} className="p-2 cursor-pointer">
        //     Sign up
        //   </li>
        // </ul>
        <div className=" flex justify-center items-center h-screen  w-screen">
          <div className="px-6 sm:px-0 max-w-sm">
            <button
              onClick={handleSignIn}
              type="button"
              className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign up with Google<div></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboard;
