import Link from "next/link";
import { useState } from "react";
import { countries } from "@/components/country/countryselector";


const Calculator: React.FC = () => {
  const selectGender = [
    { title: "Male", value: "a" },
    { title: "Female", value: "b" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center gap-5">
        <div>
          Input 1
          <div className="flex flex-row place-items-center gap-4 ">
            <div className="p-2 ">
              Select Gender
              <select className="bg-black text-white p-2 mx-2 border-2 border-white rounded-md">
                {selectGender.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
                Select Country
              <select className="bg-black text-white p-2 mx-2 border-2 border-white rounded-md">
                {countries.map((option) => (
                  <option value={option.code} key={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <Link href="?bikemodal=true">
              <button type="button" className="bg-blue-500 text-white p-2">
                Select your Bike
              </button>
            </Link>
          </div>
        </div>
        
        <div>
          Input 2
        </div>
      </div>
    </div>
  );
};

export default Calculator;
