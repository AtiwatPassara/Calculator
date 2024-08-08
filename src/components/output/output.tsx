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
      <div className="flex justify-center items-center min-h-screen" >
        <div className="flex flex-col justify-center gap-8 m-2 ">
          <hr className="m-4" />
          <span className="flex text-3xl font-bold justify-center">Result</span>
          <div className="flex flex-col">
            <div className="flex justify-start m-4 text-xl font-bold md:text-2xl text-green-300">
             CF of Biking:&nbsp;
              <span className="font-bold">
                {roundedDecimal(userInput.CalculatedResult.TotalImpact, 1)}&nbsp;<span className="text-xl md:text-xl">gCO<sub>2</sub>e/Km</span>
              </span>
            </div>
            <div className="flex justify-start m-4 text-lg md:text-base">
              Excess calories spent:&nbsp;
              <span className="font-bold">
                {roundedDecimal(userInput.CalculatedResult.ECS, 1)}&nbsp;Kcal/Km
              </span>
            </div>
            <div className="flex justify-start m-4 text-lg md:text-base">
              Base calories spent:&nbsp;
              <span className="font-bold">
                {roundedDecimal(userInput.CalculatedResult.BCS, 1)}&nbsp;Kcal/Km
              </span>
            </div>
            <div className="flex flex-col lg:flex-row">
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
