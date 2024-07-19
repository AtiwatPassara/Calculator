
import { useState } from "react"
import ImpactDoughnutChart from "../chart/Doughnut"
import ImpactBarChart from "../chart/Barchart"

interface Result {
    kcalSpend: number,
    dietImpact: number,
    bikeImpact: number,
  }

interface Physical{
    gender: string,
    age: number,
    weight: number,
    fitness: number,
    physicalImpact: number,
    temperature: number | null,
    pressure: number | null,
  }
  
  interface Cycling{
    bike: string | null, 
    speed: number,
    duration: number,
    bikeImpact: number,
  }
  
  interface Diet{
    region: string,
    eating: string, 
    impact: number,
  }

interface UserSelection {
    Physical : Physical,
    Cycling : Cycling,
    Diet : Diet,
    Result : Result,
}

interface OutputProps {
    userInput : UserSelection | null
}

const OutputChart: React.FC<OutputProps> = ({userInput}) => {

    const roundedDecimal = (value: number, decimalPlaces: number) : number => {
        const factor = Math.pow(10,decimalPlaces)
        const roundedValue = Math.round(value * factor)/ factor
        return roundedValue
    }

    if(!userInput){
        return
    }
    else{
    return <div className="flex flex-row justify-center gap-8 m-2">
                <div>
                    <hr className="m-4"/>
                    <span className="flex text-3xl mt-5 font-bold justify-center ">Result</span>
                    <div className="flex flex-col">
                        <div>
                            Excess Calories Spent : {roundedDecimal(userInput.Result.kcalSpend,3)} Kcal/Km
                        </div>
                        <div className="flex m-4 justify-center">
                            <ImpactDoughnutChart userInput={userInput}/>
                        </div>
                        <div className="flex justify-center m-4 ">
                            <ImpactBarChart userInput={userInput}/>
                        </div>
                    </div>
                </div>
            </div>
    }
}

export default OutputChart


