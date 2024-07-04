'use client'
import { useEffect, useState } from "react";
import DietInput from "@/components/Input/dietInput";
import CyclingInput from "@/components/Input/cyclingInput";
import PhysicalInput from "@/components/Input/physicalInput";
import MyChart from "@/components/chart/Doughnut";
import MyDoughnutChart from "@/components/chart/Doughnut";
import Output from "@/components/output/output";

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

interface EatingHabit {
  id:number;
  Region: string;
  Habit: string;
  Impact: number;
}

interface bikeData {
  id: number;
  Bike: string;
  Impact: number;
}

interface PageProps {
  eatingData: EatingHabit[];
}

const Calculator: React.FC<PageProps> = () => {
  const [selectedGender, setSelectedGender] = useState<string>("-");
  const [selectedRegion, setSelectedRegion] = useState<string>("-");
  const [selectedEating, setSelectedEating] = useState<string>("-");
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState<number>(0);
  const [selectedFitness, setSelectedFitness] = useState<number>(0);
  const [inputSteepness, setInputSteepness] = useState<number>(0);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [pressure, setPressure] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTableModal, setShowTableModal] = useState<boolean>(false);
  const [eatingData, setEatingData] = useState<EatingHabit[]>([]);
  const [selectedImpact,setSelectedImpact] = useState<number>(0);
  const [bikeData,setBikeData] = useState<bikeData[]>([])
  const [bikeImpact,setBikeImpact] = useState<number>(0)
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [userInput,setUserInput] = useState<UserSelection | null>(null)

  useEffect(() => {
    async function fetchBikeData(){
      try{
        const res = await fetch('api/bikeData');
        if(!res.ok){
          throw new Error('Error fetching data');
        }
        const result: bikeData[] = await res.json();
        setBikeData(result);
      }
      catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }

    async function fetchRegionData() {
      try {
        const res = await fetch('/api/eatingData');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const result: EatingHabit[] = await res.json();
        // console.log('Fetched data:', result); 
        setEatingData(result);
      } catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }
    fetchRegionData();
    fetchBikeData();
  }, []);

  useEffect(() => {
    const matchDiet = (selectedRegion : string | null, selectedEating : string | null) => {
      if(!eatingData){return}
      try{
        const [match] = eatingData.filter(data => data.Region === selectedRegion && data.Habit === selectedEating)
      if(match){
        setSelectedImpact(match.Impact)}
      else{
        setSelectedImpact(0)
      }}
      catch(error){
        console.error(error)
      }
  }
  matchDiet(selectedRegion,selectedEating)
  },[selectedRegion,selectedEating])

  useEffect(() => {
    const matchBike = (selectedBike : string | null ) => {
      if(!bikeData){return}
      try{
        const [match] = bikeData.filter(data => data.Bike === selectedBike)
      if(match){
        setBikeImpact(match.Impact)}
      else{
        setBikeImpact(0)
        console.log(bikeData)
      }}
      catch(error){
        console.error(error)
      }
 
  }
  matchBike(selectedBike)
  },[selectedBike])
  

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleOpenTableModal = () => {
    setShowTableModal(true);
  };

  const handleCloseTableModal = () => {
    setShowTableModal(false);
  }

  const handleBikeSelection = (bikeType: string) => {
    setSelectedBike((prevBike) => (prevBike === bikeType ? null : bikeType));
  };

  const handleBikeSubmit = () => {
    handleCloseModal();
  };

  const handleSteepInput = (steepness: number) => {
    setInputSteepness(steepness);
  }

  const handleSubmit = () => {

    // Set default values if necessary
    let updatedBike = selectedBike;
    let updatedRegion = selectedRegion;
    let updatedEating = selectedEating;
    let updatedAge = selectedAge;
    let updatedWeight = selectedWeight;
    let updatedFitness = selectedFitness;
  
    if (selectedBike === null) {
      updatedBike = "Classic";
    }
    if (selectedRegion === "-") {
      updatedRegion = "North America";
    }
    if (selectedEating === "-") {
      updatedEating = "Omnivore";
    }
    if (selectedAge === 0) {
      updatedAge = 30;
    }
    if (selectedWeight === 0) {
      updatedWeight = 70;
    }
    if (selectedFitness === 0) {
      updatedFitness = 3;
    }
    
    const matchDiet = (selectedRegion : string | null, selectedEating : string | null) => {
      if(!eatingData){return 0}
      try{
        const [match] = eatingData.filter(data => data.Region === updatedRegion && data.Habit === updatedEating)
      if(match){
        return match.Impact;
        }
      else{
        return 0;
      }}
      catch(error){
        console.error(error)
        return 0;
      }
    }
    const updatedDietImpact = matchDiet(selectedRegion,selectedEating)

    const matchBike = (updatedBike: string | null) => {
      if (!bikeData) { return 0; }
      try {
        const match = bikeData.find(data => data.Bike === updatedBike);
        if (match) {
          return match.Impact;
        } else {
          console.log(bikeData);
          return 0;
        }
      } catch (error) {
        console.error(error);
        return 0;
      }
    }
    const updatedBikeImpact = matchBike(updatedBike);
  
    // Update states with default values
    setSelectedBike(updatedBike);
    setSelectedRegion(updatedRegion);
    setSelectedEating(updatedEating);
    setSelectedAge(updatedAge);
    setSelectedWeight(updatedWeight);
    setSelectedFitness(updatedFitness);
  
    const userSelection: UserSelection = {
      gender: selectedGender,
      region: updatedRegion,
      bike: updatedBike,
      eating: updatedEating,
      age: updatedAge,
      weight: updatedWeight,
      fitness: updatedFitness,
      temperature: temperature,
      pressure: pressure,
      impact: updatedDietImpact,
      bikeImpact: updatedBikeImpact,
      // steepness: inputSteepness
    };
  
    // Update the userInput state
    setUserInput(userSelection);
  
    // Log the userSelection object
    console.log(userSelection);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center mt-5 ">
        <span className="text-3xl m-5 font-bold">Provide Your Details</span>
          <div className="flex flex-col justify-center gap-8 m-3 border p-9 border-gray-500">
            <DietInput 
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedEating={selectedEating}
              setSelectedEating={setSelectedEating}
              eating={eatingData}
              />
            <CyclingInput 
              selectedBike={selectedBike}
              setSelectedBike={setSelectedBike}
              showModal={showModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              handleBikeSelection={handleBikeSelection}
              handleBikeSubmit={handleBikeSubmit}/>
            {/* <BehaviorInput 
              inputSteepness={inputSteepness}
              setInputSteepness={setInputSteepness}
              handleSteepInput={handleSteepInput}/> */}
            <PhysicalInput 
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              selectedAge={selectedAge}
              setSelectedAge={setSelectedAge}
              selectedWeight={selectedWeight}
              setSelectedWeight={setSelectedWeight}
              selectedFitness={selectedFitness}
              setSelectedFitness={setSelectedFitness}
              setTemperature={setTemperature} 
              setPressure={setPressure}
              handleCloseTableModal={handleCloseTableModal}
              handleOpenTableModal={handleOpenTableModal}
              showTableModal={showTableModal}
            />
            <div className="flex justify-center">
              <button onClick={() => handleSubmit()} className='border rounded py-2 px-4 hover:border-green-500 duration-200 focus:border-2 focus:ring'>Submit</button>
            </div>     
          </div>
        <div>
              <Output 
              userInput= {userInput}/>
        </div>
      </div>
    </div>
  );
};

export default Calculator;


