import { useState } from "react";
import ImpactDoughnutChart from "../chart/Doughnut";
import ImpactBarChart from "../chart/Barchart";
import { UserSelection } from "@/app/type/userSelection";
import { transportsData } from "@/app/type/bikeTestData";

interface OutputProps {
  userInput: UserSelection | null;
  transportsData: transportsData[] | null;
}

const OutputChart: React.FC<OutputProps> = ({ userInput,transportsData }) => {
  const roundedDecimal = (value: number, decimalPlaces: number): number => {
    const factor = Math.pow(10, decimalPlaces);
    const roundedValue = Math.round(value * factor) / factor;
    return roundedValue;
  };

  if (!userInput) {
    return null;
  } else {
    return (
      <div className="flex justify-center flex-col min-h-screen" >
        <div className="flex flex-col justify-center items-center gap-8 m-2 ">
          <hr className="m-4" />
          <span className="flex text-3xl font-bold justify-center">Result</span>
          <div className="flex flex-col">
            <div className="flex justify-start md:justify-center m-4 text-xl font-bold md:text-2xl text-green-300">
             CF of Biking:&nbsp;
              <span className="font-bold">
                {roundedDecimal(userInput.CalculatedResult.TotalImpact, 1)}&nbsp;<span className="text-xl md:text-xl">gCO<sub>2</sub>eq/pkm</span>
              </span>
            </div>
            <div className="flex justify-start md:justify-center m-4 text-lg md:text-base">
              Excess calories spent:&nbsp;
              <span className="font-bold">
                {roundedDecimal(userInput.CalculatedResult.ECS, 1)}&nbsp;Kcal/Km
              </span>
            </div>
            <div className="flex justify-start md:justify-center m-4 text-lg md:text-base">
              Base calories spent:&nbsp;
              <span className="font-bold">
                {roundedDecimal(userInput.CalculatedResult.BCS, 1)}&nbsp;Kcal/Day
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
                  <ImpactBarChart userInput={userInput} transportData={transportsData}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col m-3 ">
          <div className="justify-start text-2xl font-bold mb-2">
            Reference
          </div>
          <hr />
          <div>
            <ul className="list-disc pl-5 m-4 space-y-4">
              <li>
                Ecoinvent Centre. (2024). <em>Ecoinvent database version 3.10</em>. Ecoinvent Association. Retrieved from 
                <a href="https://www.ecoinvent.org" target="_blank" rel="noopener noreferrer">https://www.ecoinvent.org</a>
              </li>
              <li>
                de Bortoli, A. (2021). Environmental performance of shared micromobility and personal alternatives using integrated modal LCA. <em>Transportation Research Part D: Transport and Environment</em>. 
                <a href="https://doi.org/10.1016/j.trd.2021.102743" target="_blank" rel="noopener noreferrer">https://doi.org/10.1016/j.trd.2021.102743</a>
              </li>
              <li>
                de Bortoli, A., & Féraille, A. (2024). Banning short-haul flights and investing in high-speed railways for a sustainable future? <em>Transportation Research Part D: Transport and Environment</em>. 
                <a href="https://doi.org/10.1016/j.trd.2023.103987" target="_blank" rel="noopener noreferrer">https://doi.org/10.1016/j.trd.2023.103987</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default OutputChart;
