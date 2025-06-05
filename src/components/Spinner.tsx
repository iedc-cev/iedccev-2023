import Image from "next/image";
import loader from "../../public/infinite-spinner.svg";

const Spinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src={loader} priority={true} alt="loading.." />
    </div>
  );
};

export default Spinner;
