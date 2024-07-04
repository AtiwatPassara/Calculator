
import { useState } from "react"
import MyDoughnutChart from "../chart/Doughnut"

interface UserSelection {
    gender: string,
    region: string,
    bike: string | null,
    eating: string,
    age: number,
    weight: number,
    fitness: number,
    temperature: number | null,
    pressure: number | null,
    impact: number,
    bikeImpact: number,
    // steepness: inputSteepness
}

interface OutputProps {
    userInput : UserSelection | null
}

const OutputChart: React.FC<OutputProps> = ({userInput}) => {

    if(!userInput){
        return
    }
    else{
    return <div className="flex flex-row justify-center gap-8 m-2">
                <div>
                    <hr className="m-4"/>
                    <span className="flex text-3xl mt-5 font-bold justify-center ">Result</span>
                    <div className="flex">
                        <div className="m-4">
                            <MyDoughnutChart userInput={userInput}/>
                        </div>
                        <div className="m-4">
                            <MyDoughnutChart userInput={userInput}/>
                        </div>
                    </div>
                </div>
            </div>
    }
}

export default OutputChart


