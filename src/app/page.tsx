import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-around p-8">
      <div className="text-white max-w-lg mb-8 lg:mb-0">
        <div className="text-5xl font-bold leading-tight text-center lg:text-left">
          Calculating tool for
          <div>
            <span className="text-green-500">Environmental Impact</span> of
            <span className="text-yellow-500"> Biking</span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-8">
          <div className="text-[15px] leading-relaxed text-center lg:text-left">
            Discover how your biking habits positively impact the environment. 
            Use our calculator to assess the impact of your Biking. 
            Start calculating now to see the difference you make!
          </div>
          <button className="flex items-center border-4 border-white rounded-lg p-5 text-[28px] hover:bg-black hover:border-yellow-500 hover:text-yellow-500 transition-all hover:scale-110 duration-300 ease-in-out">
            <Link href="/calculator">Calculate</Link>
          </button>
        </div>
      </div>
      <div className="relative w-full lg:w-[39rem] h-[25rem] lg:ml-10"> 
        <Image src="/asset/bike.gif" alt="Bike" fill style={{ objectFit: 'contain' }} />
      </div>
    </div>
  );
}
