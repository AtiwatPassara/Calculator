'use client'
import { useEffect, useState } from "react";
import DietInput from "@/components/Input/dietInput";
import CyclingInput from "@/components/Input/cyclingInput";
import PhysicalInput from "@/components/Input/physicalInput";


interface EatingHabit {
  id:number;
  Region: string;
  Habit: string;
  Impact: number;
}

interface PageProps {
  eatingData: EatingHabit[];
}

const Calculator: React.FC<PageProps> = ({eatingData}) => {
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
  const [eating, setEating] = useState<EatingHabit[]>([]);
  const [selectedImpact,setSelectedImpact] = useState<number>(0);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRegionData() {
      try {
        const res = await fetch('/api/eatingData');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const result: EatingHabit[] = await res.json();
        console.log('Fetched data:', result); 
        setEating(result);
      } catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }
    fetchRegionData();
  }, []);

  useEffect(() => {
    const matchDiet = (selectedRegion : string | null, selectedEating : string | null) => {
      if(!eating){return}
      try{
        const [match] = eating.filter(data => data.Region === selectedRegion && data.Habit === selectedEating)
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
    const userSelection = {
      gender: selectedGender,
      region: selectedRegion,
      bike: selectedBike,
      eating: selectedEating,
      age: selectedAge,
      weight: selectedWeight,
      fitness: selectedFitness,
      temperature: temperature,
      pressure: pressure,
      impact: selectedImpact,
      // steepness: inputSteepness
    };

    console.log(userSelection);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <span className="text-3xl mb-11 font-bold">Provide Your Details</span>
        <div className="flex flex-col justify-center gap-8">
          <DietInput 
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedEating={selectedEating}
            setSelectedEating={setSelectedEating}
            eating={eating}
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
            <button onClick={() => { handleSubmit();}} className='border rounded py-2 px-4 hover:border-green-500 duration-200 focus:border-2 focus:ring'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;


