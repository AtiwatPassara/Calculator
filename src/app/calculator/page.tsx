'use client'
import { useEffect, useState } from "react";
import DietInput from "@/components/Input/dietInput";
import CyclingInput from "@/components/Input/cyclingInput";
import PhysicalInput from "@/components/Input/physicalInput";
import Output from "@/components/output/output";

interface Physical{
  gender: string,
  age: number,
  weight: number,
  fitness: number,
  physicalImpact: number,
  height: number,
  temperature: number | null,
  pressure: number | null,
}

interface Cycling{
  bike: string | null, 
  material: string | null,
  power: string | null,
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
}

interface physicalData{
  id:number;
  Fitness:number;
  Impact:number;
}

interface eatingData {
  id:number;
  Region: string;
  Habit: string;
  Impact: number;
}

interface classicBikeData {
  id: number;
  Material: string;
  PowerType: string;
  Impact: number;
}

interface cargoBikeData {
  id: number;
  PowerType: string;
  Impact: number;
}

interface PageProps {
  eatingData: eatingData[];
}

const Calculator: React.FC<PageProps> = () => {
  const [selectedGender, setSelectedGender] = useState<string>("-");
  const [selectedRegion, setSelectedRegion] = useState<string>("-");
  const [selectedEating, setSelectedEating] = useState<string>("-");
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState<number>(0);
  const [selectedFitness, setSelectedFitness] = useState<number>(0);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [pressure, setPressure] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTableModal, setShowTableModal] = useState<boolean>(false);
  const [eatingData, setEatingData] = useState<eatingData[]>([]);
  const [selectedImpact,setSelectedImpact] = useState<number>(0);
  const [classicBikeData,setclassicBikeData] = useState<classicBikeData[]>([])
  const [cargoBikeData,setcargoBikeData] = useState<cargoBikeData[]>([])
  const [bikeImpact,setBikeImpact] = useState<number>(0)
  const [fitnessImpact,setFitnessImpact] = useState<number>(0);
  const [physicalData,setPhysicalData] = useState<physicalData[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [userInput,setUserInput] = useState<UserSelection | null>(null);
  const [selectedSpeed,setSelectedSpeed] = useState<number>(0);
  const [selectedDuration,setSelectedDuration] = useState<number>(0);
  const [selectedHeight,setSelectedHeight] = useState<number>(0);
  const [selectedPower,setSelectedPower] = useState<string>("-");
  const [selectedMaterial,setSelectedMaterial] = useState<string>("-");
  
  useEffect(() => {
    async function fetchClassicBikeData(){
      try{
        const res = await fetch('api/classicBikeData');
        if(!res.ok){
          throw new Error('Error fetching data');
        }
        const result: classicBikeData[] = await res.json();
        setclassicBikeData(result);
      }
      catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }

    async function fetchCargoBikeData(){
      try{
        const res = await fetch('api/cargoBikeData');
        if(!res.ok){
          throw new Error('Error fetching data');
        }
        const result: cargoBikeData[] = await res.json();
        setcargoBikeData(result);
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
        const result: eatingData[] = await res.json();
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

    async function fetchPhysicalData() {
      try{
        const res = await fetch('/api/physicalData');
        if(!res.ok){
          throw new Error('Error fetching data');
        }
        const result: physicalData[] = await res.json();
        setPhysicalData(result)
      } catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }
    fetchCargoBikeData();
    fetchRegionData();
    fetchClassicBikeData();
    fetchPhysicalData();
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
      if(!classicBikeData || !cargoBikeData){return}
      try{
          if(selectedBike === "Classic"){
            const [match] = classicBikeData.filter(data => data.Material === selectedMaterial && data.PowerType === selectedPower)
            if(match){
              setBikeImpact(match.Impact)}
            else{
              setBikeImpact(0)
            }
          }
          else if(selectedBike === "Cargo"){       
              const [match] = cargoBikeData.filter(data => data.PowerType === selectedPower)
              if(match){
                setBikeImpact(match.Impact)}
              else{
                setBikeImpact(0)
            }
          }           
            else{return}
          }
      catch(error){
        console.error(error)
      }
 
  }
  matchBike(selectedBike)
  },[selectedBike])
  
  useEffect(() => {
    const matchPhysical = (selectedFitness : number | null ) => {
      if(!physicalData){return}
      try{
        const [match] = physicalData.filter(data => data.Fitness === selectedFitness)
      if(match){
        setFitnessImpact(match.Impact)}
      else{
        setFitnessImpact(0)
        console.log(physicalData)
      }}
      catch(error){
        console.error(error)
      }
    }
      matchPhysical(selectedFitness)
      },[selectedFitness])


  const handleMaterialSelection = (material: string) => {
    setSelectedMaterial(material);
  }


  const handlePowerSelection = (power: string) => {
    setSelectedPower(power);
  }

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
    setSelectedBike(bikeType);
  };

  const handleBikeSubmit = () => {
    handleCloseModal();
  };

  const handleSubmit = () => {
    let updatedBike = selectedBike ?? "Classic";
    let updatedRegion = selectedRegion === "-" ? "North America" : selectedRegion;
    let updatedEating = selectedEating === "-" ? "Omnivore" : selectedEating;
    let updatedAge = selectedAge === 0 ? 30 : selectedAge;
    let updatedWeight = selectedWeight === 0 ? 70 : selectedWeight;
    let updatedFitness = selectedFitness === 0 ? 3 : selectedFitness;
    let updatedGender = selectedGender === "-" ? "male" : selectedGender;
    let updatedSpeed = selectedSpeed === 0 ? 15 : selectedSpeed;
    let updatedHeight = selectedHeight === 0 ? 170 : selectedHeight;
    let updatedDuration = selectedDuration === 0 ? 30 : selectedDuration;
    let updatedMaterial = selectedMaterial === '-' ? "Aluminium" : selectedMaterial;
    let updatedPower = selectedPower === '-' ? 'Mechanic' : selectedPower;
  
    const matchDiet = () => {
      if (!eatingData) { return 0; }
      try {
        const [match] = eatingData.filter(data => data.Region === updatedRegion && data.Habit === updatedEating);
        return match ? match.Impact : 0;
      } catch (error) {
        console.error(error);
        return 0;
      }
    }
  
    const updatedDietImpact = matchDiet();
  
    const matchPhysical = () => {
      if (!physicalData) { return 0; }
      try {
        const match = physicalData.find(data => data.Fitness === updatedFitness);
        return match ? match.Impact : 0;
      } catch (error) {
        console.error(error);
        return 0;
      }
    }
  
    const updatedPhysical = matchPhysical();
  
    const matchBike = () => {
      if (!classicBikeData || !cargoBikeData) { return 0; }
      try {
        if (updatedBike === "Classic") {
          const match = classicBikeData.find(data => data.Material === updatedMaterial && data.PowerType === updatedPower);
          return match ? match.Impact : 0;
        } else if (updatedBike === "Cargo") {
          const match = cargoBikeData.find(data => data.PowerType === updatedPower);
          return match ? match.Impact : 0;
        }
        return 0;
      } catch (error) {
        console.error(error);
        return 0;
      }
    }
  
    const updatedBikeImpact = matchBike();
  
    // Update states with default values and impacts
    setSelectedBike(updatedBike);
    setSelectedRegion(updatedRegion);
    setSelectedEating(updatedEating);
    setSelectedAge(updatedAge);
    setSelectedWeight(updatedWeight);
    setSelectedFitness(updatedFitness);
    setSelectedGender(updatedGender);
    setSelectedSpeed(updatedSpeed);
    setSelectedHeight(updatedHeight);
    setSelectedDuration(updatedDuration);
    setSelectedMaterial(updatedMaterial);
    setSelectedPower(updatedPower);
    setBikeImpact(updatedBikeImpact);  // Update bike impact immediately
    
    const userSelection: UserSelection = {
      Physical: {
        gender: updatedGender,
        age: updatedAge,
        weight: updatedWeight,
        fitness: updatedFitness,
        physicalImpact: updatedPhysical,
        height: updatedHeight,
        temperature: temperature,
        pressure: pressure,
      },
      Cycling: {
        bike: updatedBike,
        material: updatedMaterial,
        power: updatedPower,
        speed: updatedSpeed,
        duration: updatedDuration,
        bikeImpact: updatedBikeImpact,
      },
      Diet: {
        region: updatedRegion,
        eating: updatedEating,
        impact: updatedDietImpact,
      }
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
          <div className="flex flex-col justify-center gap-8 m-9 border p-9 border-gray-500">
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
              handleBikeSubmit={handleBikeSubmit}
              setSelectedSpeed={setSelectedSpeed}
              selectedSpeed={selectedSpeed}
              setSelectedDuration={setSelectedDuration}
              selectedDuration={selectedDuration}
              handlePowerSelection={handlePowerSelection} 
              selectedPower={selectedPower} 
              handleMaterialSelection={handleMaterialSelection} 
              selectedMaterial={selectedMaterial}              
              />
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
              selectedHeight={selectedHeight}
              setSelectedHeight={setSelectedHeight}
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