import Image from "next/image";

const HeroImg = () => {
  return (
    <div className="">
      <Image
        className="w-full rounded-lg h-full object-cover"
        src="https://img.freepik.com/free-photo/handsome-african-guy-with-happy-face-expression-supporting-his-friends-before-conference-indoor-portrait-work-team-young-international-specialists-preparing-meeting-with-chief_197531-3781.jpg?w=996&t=st=1701236231~exp=1701236831~hmac=7a3413a7917ac55d8dc40d607c35e010490a16fc22adf30aa26e54310b92f3c2"
        alt=""
        width={300}
        height={300}
      />
    </div>
  );
};

export default HeroImg;
