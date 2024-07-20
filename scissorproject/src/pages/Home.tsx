import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoBG from "../assets/7296058-uhd_2160_4096_30fps.mp4";

const Home = () => {
  return (
    <>
      <div className="flex flex-col py-44 w-auto min-h-screen ">
        <Header />
        <div className=" p-4">
          <div className="flex flex-row gap-4 m-7 p-3 h-[560px] bg-white self-center overflow-hidden rounded-[20px]">
            <div className="col-span-1 flex flex-col justify-center">
              <h1 className="text-4xl leading-[56px] font-bold text-black custom-tracking-tight">
                Create compact links and monitor their traffic with our free URL
                shortener.
              </h1>
              <p className="text-base font-normal text-black mt-4">
                Convert lengthy URLs into concise, shareable, and trackable
                links. Use Canva's short link generator to quickly create custom
                short URLs that you can effortlessly embed into any design.
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-center p-4 h-full w-full">
              <video
                className="rounded-[10px] border border-blue-500"
                src={VideoBG}
                autoPlay
                loop
                muted
              ></video>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
