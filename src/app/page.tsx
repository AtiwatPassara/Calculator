import { Input } from "@nextui-org/input";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-around p-8">
      <div className="text-white max-w-lg">
        <div className="text-5xl font-bold leading-tight">
          This website is for calculating
          <div>
            <span className="text-green-500">Environmental Impact</span> of
            <span className="text-yellow-500"> Biking</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-8 mt-8">
          <div className="text-[15px] leading-relaxed">
            This website is designed to help you understand the environmental impact of biking. 
            You can calculate the positive effects your biking has on the environment.
          </div>
          <Link href={"/calculator"}>
            <button className="flex items-center border-4 border-white rounded-lg p-5 text-[28px] hover:bg-black hover:border-yellow-500 hover:text-yellow-500 transition-all hover:scale-110 duration-300 ease-in-out">
            Calculate
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden text-5xl text-white lg:block">
        Picture
      </div>
    </div>
  );
}
