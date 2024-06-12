import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-around p-8">
      <div className="text-white max-w-lg mb-8 lg:mb-0">
        <div className="text-5xl font-bold leading-tight text-center lg:text-left">
          This website is for calculating
          <div>
            <span className="text-green-500">Environmental Impact</span> of
            <span className="text-yellow-500"> Biking</span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-8">
          <div className="text-[15px] leading-relaxed text-center lg:text-left">
            This website is designed to help you understand the environmental impact of biking. 
            You can calculate the positive effects your biking has on the environment.
          </div>
          <button className="flex items-center border-4 border-white rounded-lg p-5 text-[28px] hover:bg-black hover:border-yellow-500 hover:text-yellow-500 transition-all hover:scale-110 duration-300 ease-in-out">
            Calculate
          </button>
        </div>
      </div>
      <div className="relative w-full lg:w-[39rem] h-[25rem] lg:ml-10"> 
        <Image src="/asset/bike.gif" alt="Bike" fill style={{ objectFit: 'contain' }} />
      </div>
    </div>
  );
}
