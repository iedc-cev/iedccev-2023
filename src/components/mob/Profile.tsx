import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
const Profile = ({ userData }: { userData: UserData }) => {
  const router = useRouter();

  const userAuth = UserAuth();
  // const user = userAuth?.user;
  const logOut = userAuth?.logOut;
  // const photoUrl = user!.photoURL?.replaceAll("s96-c", "s400-c");

  const handleSignOut = async () => {
    try {
      await logOut!();
      // router.push("/onboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"> */}
      {/* <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"> */}

      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative w-64 h-64 ">
                    <Image
                      alt="..."
                      fill
                      src={userData.photoUrl || "/assets/img/hero-pattern.webp"}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute "
                    />
                  </div>
                </div>
                {/* <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Comments
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                  {userData.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {userData.city}, {userData.state}, {userData.country}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {userData.course} {userData.passoutYear}
                </div>
                {/* <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div> */}
              </div>
              {/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a
                      href="javascript:void(0);"
                      className="font-normal text-pink-500"
                    >
                      Show more
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="absolute right-5 top-5 bg-gray-700 px-3 py-2 text-white rounded-xl cursor-pointer"
          >
            Sign Out
          </button>
        </div>
        {/* <footer className="relative  pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with{" "}
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank"
                  >
                    Notus JS
                  </a>{" "}
                  by{" "}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                  >
                    {" "}
                    Creative Tim
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer> */}
      </section>
    </div>
  );
};

export default Profile;
