"use client";
import Spinner from "@/components/Spinner";
import Profile from "@/components/mob/Profile";
import { UserAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UserData {
  course: string;
  passoutYear: string;
  interests: UserInterests;
  phoneNumber: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  username: string;
  name: string;
  email: string;
  photoUrl: string;
}
interface UserInterests {
  web: boolean;
  app: boolean;
  ml: boolean;
  ai: boolean;
  iot: boolean;
  blockchain: boolean;
  cloud: boolean;
  design: boolean;
  management: boolean;
}
const Page = () => {
  const router = useRouter();

  const userAuth = UserAuth();
  // console.log(userAuth + "\n" + typeof userAuth);

  const user = userAuth?.user;
  const logOut = userAuth?.logOut;

  const handleSignOut = async () => {
    try {
      await logOut!();
      router.push("/join");
    } catch (error) {
      console.log(error);
    }
  };
  const [userData, setUserData] = useState<UserData | null>(null);
  const [interest, setInterest] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserData(docSnap.data() as UserData);
          // setInterests(docSnap.data()?.interests);
          const interests = docSnap.data()?.interests;
          // const interested = Object.keys(interests).filter(
          //   (interest) => interests[interest]

          // );
          const interested = Object.keys(interests)
            .filter((interest) => interests[interest])
            .map((item) => {
              switch (item) {
                case "web":
                  return "Web Development";
                case "app":
                  return "App Development";
                case "ml":
                  return "Machine Learning";
                case "ai":
                  return "Artificial Intelligence";
                case "iot":
                  return "Internet of Things";
                case "blockchain":
                  return "Blockchain";
                case "cloud":
                  return "Cloud Computing";
                case "design":
                  return "Design";
                case "management":
                  return "Management";
                default:
                  return item;
              }
            });

          console.log("doc.data() ");
          setInterest(interested);
          setLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("doc.data() Inside");
          router.push("/join");

          console.log("No such document!");
        }
      } else {
        console.log("doc.data() outside");

        router.push("/join");
      }
    }
    // setTimeout(() => {
    getUser();
    // }, 5000);
  }, [router, user]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="hidden font-raleway font-semibold  md:flex flex-col">
            <div className=" absolute bg-hero-pattern   bg-cover h-52 w-full -z-40  "></div>
            <div className="absolute top-20 left-20 flex justify-center items-center">
              <div className=" relative rounded-full bg-slate-500 w-60 h-60 z-50">
                <div className="absolute bg-transparent border-[10px] border-white rounded-full  h-72 w-72 -top-5 -left-6 bg-white -z-40 "></div>
                <Image
                  src={user?.photoURL || "/assets/img/hero-pattern.webp"}
                  alt=""
                  fill
                  className="absolute top-0 left-0 object-cover rounded-full hover:scale-125 transition-all duration-300"
                />
              </div>
              <div className="flex  flex-col ml-14 gap-5 -mt-5">
                <div className="text-2xl mix-blend-multiply">
                  <h1>{userData?.name}</h1>
                  <p>username: {userData?.username}</p>
                </div>
                <div className="flex gap-16">
                  <div className="flex gap-2 uppercase">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.5 0.048439C8.25469 0.048439 4.8125 3.35938 4.8125 7.44375C4.8125 8.49844 5.04687 9.50156 5.45937 10.4094L12.6313 21.8484L19.5406 10.4094C19.9547 9.50156 20.1844 8.49688 20.1844 7.44375C20.1844 3.35938 16.7453 0.048439 12.5 0.048439ZM12.5 12.6891C9.83594 12.6891 7.67969 10.5219 7.67969 7.84844C7.67969 5.17813 9.83594 3.00938 12.5 3.00938C15.1609 3.00938 17.3219 5.17813 17.3219 7.84844C17.3219 10.5219 15.1609 12.6891 12.5 12.6891ZM15.5891 7.78594C15.5891 9.5 14.2047 10.8875 12.4984 10.8875C10.7938 10.8875 9.40937 9.49844 9.40937 7.78594C9.40937 6.075 10.7938 4.6875 12.4984 4.6875C14.2047 4.6875 15.5891 6.07656 15.5891 7.78594Z"
                        fill="#434343"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.27959 18.4738C5.59678 19.0426 4.48389 19.7891 4.48389 20.6281C4.48389 21.8297 7.34365 23.4859 12.4765 23.4859C17.6093 23.4859 20.4709 21.8297 20.4709 20.6281C20.4709 19.7922 19.364 19.0676 16.7187 18.4738V17.1922C19.6327 17.7641 21.803 18.9125 21.803 20.6281C21.803 23.1031 16.9968 24.9577 12.4765 24.9577C7.95615 24.9577 3.1499 23.1031 3.1499 20.6281C3.1499 18.9094 5.33428 17.7391 8.26396 17.1875L8.27959 18.4738Z"
                        fill="#434343"
                      />
                    </svg>
                    {userData?.city}, {userData?.state}, {userData?.country}
                  </div>
                  <div className="flex gap-2 ">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20.8334 4.16666C22.5594 4.16666 23.9584 5.56578 23.9584 7.29166V17.7083C23.9584 19.4343 22.5594 20.8333 20.8334 20.8333H4.16675C2.44086 20.8333 1.04175 19.4343 1.04175 17.7083V7.29166C1.04175 5.56578 2.44086 4.16666 4.16675 4.16666H20.8334ZM20.0552 6.25H4.94506L11.8547 11.7049C12.2331 12.0037 12.7671 12.0037 13.1456 11.7049L20.0552 6.25ZM3.12508 7.4675V17.7083C3.12508 18.2836 3.59146 18.75 4.16675 18.75H20.8334C21.4087 18.75 21.8751 18.2836 21.8751 17.7083V7.46752L14.4364 13.3401C13.3011 14.2365 11.699 14.2365 10.5637 13.3401L3.12508 7.4675Z"
                        fill="#434343"
                      />
                    </svg>
                    {userData?.email}
                  </div>
                  <div className="flex gap-2 font-montserrat font-medium">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.7714 13.9156L17.2459 13.444C17.9017 12.7918 18.924 12.6578 19.7632 13.114L21.7533 14.1958C23.0313 14.8905 23.313 16.5932 22.3141 17.5865L20.8343 19.0577C20.4581 19.4319 19.9912 19.7053 19.4543 19.7553C18.2124 19.8711 15.6574 19.8086 12.643 18.0441L16.7714 13.9156ZM10.6151 7.79434L10.9139 7.49727C11.6499 6.76546 11.7193 5.59053 11.0771 4.73279L9.76365 2.97821C8.96888 1.91658 7.43313 1.77634 6.52218 2.68211L4.88718 4.30783C4.43549 4.75696 4.1328 5.33916 4.16951 5.98501C4.23693 7.17131 4.64131 9.33844 6.40792 12.0016L10.6151 7.79434Z"
                        fill="#434343"
                      />
                      <path
                        opacity="0.6"
                        d="M12.5654 11.9761C9.49686 8.92504 10.608 7.80118 10.6149 7.79419L6.40771 12.0015C7.10166 13.0475 8.00581 14.1702 9.1823 15.34C10.3695 16.5204 11.537 17.3967 12.6427 18.044L16.7712 13.9155C16.7712 13.9155 15.6435 15.0368 12.5654 11.9761Z"
                        fill="#434343"
                      />
                    </svg>
                    {userData?.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative top-64 left-[23rem] rounded-xl  w-9/12 h-max py-6 flex justify-between bg-red-200">
              {/* <div className="w-full h-full flex flex-col">
              <h1 className="font-semibold text-2xl mb-4 self-center">
                Skills
              </h1>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="px-3 py-2 bg-gray-700 text-white rounded-xl font-medium">
                  Web
                </div>
              </div>
            </div> */}
              <div className="w-full h-full flex justify-around">
                <h1 className="font-semibold text-2xl mb-4 self-center">
                  Interest
                </h1>
                <div className="flex justify-center flex-wrap gap-2">
                  {interest.map((item, i) => (
                    <div
                      key={i}
                      className="px-6 py-2 bg-gray-700 text-white rounded-xl font-medium"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-700 w-[95%] left-4 self-center h-96  rounded-2xl relative top-72">
              <div className="-top-4 absolute bg-black -z-10 w-full h-96  rounded-3xl  "></div>
              <div className="flex gap-3 w-auto text-3xl relative pl-10 top-6 text-white">
                <h1>Project</h1>
                <h1>Events</h1>
                <h1>Achievements</h1>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="absolute right-5 top-5 bg-gray-700 px-3 py-2 text-white rounded-xl cursor-pointer"
            >
              Sign Out
            </button>
          </div>
          {userData ? (
            <div className="md:hidden">
              <Profile userData={userData} />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
