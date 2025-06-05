export default function index() {
  return (
    <div className="h-screen justify-end flex flex-col">
      <video
        className="absolute -z-10"
        autoPlay
        loop
        muted
        // controls
      >
        <source src="background.mp4" type="video/mp4" />
      </video>
      <div className=" pb-20 pl-10 gap-3 flex flex-col bg-gradient-to-b from-transparent to-black">
        <h1 className="text-4xl font-bold">
          Innovation and Entrepreneurship Development Centre
        </h1>
        <p className="overflow-clip w-[40vw] font-light text-xl">
          College of Engineering Vadakara.
        </p>
      </div>
    </div>
  );
}
