import { useState } from "react";
import ImpactDoughnutChart from "../chart/Doughnut";
import ImpactBarChart from "../chart/Barchart";
import { UserSelection } from "@/app/type/userSelection";

interface OutputProps {
  userInput: UserSelection | null;
}

const OutputChart: React.FC<OutputProps> = ({ userInput }) => {
  const roundedDecimal = (value: number, decimalPlaces: number): number => {
    const factor = Math.pow(10, decimalPlaces);
    const roundedValue = Math.round(value * factor) / factor;
    return roundedValue;
  };

  if (!userInput) {
    return null;
  } else {
    return (
      <div className="flex flex-col justify-center gap-8 m-2">
        <div>
          <hr className="m-4" />
          <span className="flex text-3xl mt-5 font-bold justify-center">Result</span>
          <div className="flex flex-col">
            <div className="flex justify-center m-4 text-lg md:text-xl">
              Excess calories spent to bike :&nbsp;
              <span className="font-bold">
                {roundedDecimal(userInput.Result.kcalSpend, 1)}&nbsp;Kcal/Km
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center m-4 p-4 ">
                <div className="w-full max-w-lg">
                  <ImpactDoughnutChart userInput={userInput} />
                </div>
              </div>
              <div className="flex justify-center m-4 items-center">
                <div className="w-full max-w-2xl">
                  <ImpactBarChart userInput={userInput} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default OutputChart;
