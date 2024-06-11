import { Input } from "@nextui-org/input";

export default function Page() {
  return (
    <div className="flex items-center justify-around">
      <div className="text-5xl text-white max-w-md">
        <div className="font-bold">
          This website is for calculating
            <div >
              <span className="text-green-500">Environmental Impact</span> of
              <span className="text-yellow-500"> Biking</span>
            </div>
        </div>
        <br />
        <div className="text-[15px] mt-2 leading-relaxed">
          This website is designed to help you understand the environmental impact of biking. 
          By entering simple details about your biking activities, such as the duration of your 
          rides and your food consumption, you can calculate the positive effects your biking has on the environment.
        </div>
      </div>

      <div>
        <h5 className="text-5xl">Picture</h5>
      </div>
    </div>
  );
}
