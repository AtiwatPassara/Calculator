'use client'
import { useEffect, useState } from "react";
import DietInput from "@/components/Input/dietInput";
import CyclingInput from "@/components/Input/cyclingInput";
import PhysicalInput from "@/components/Input/physicalInput";

interface EatingHabit {
  id: number;
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
  const [selectedImpact, setSelectedImpact] = useState<number>(0);
  const [bikeData, setBikeData] = useState<bikeData[]>([]);
  const [bikeImpact, setBikeImpact] = useState<number>(0);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBikeData() {
      try {
        const res = await fetch('api/bikeData');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const result: bikeData[] = await res.json();
        setBikeData(result);
      } catch (error) {
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
    const matchDiet = (selectedRegion: string | null, selectedEating: string | null) => {
      if (!eatingData) { return; }
      try {
        const match = eatingData.find(data => data.Region === selectedRegion && data.Habit === selectedEating);
        if (match) {
          setSelectedImpact(match.Impact);
        } else {
          setSelectedImpact(0);
        }
      } catch (error) {
        console.error(error);
      }
    }
    matchDiet(selectedRegion, selectedEating);
  }, [selectedRegion, selectedEating]);

  useEffect(() => {
    const matchBike = (selectedBike: string | null) => {
      if (!bikeData) { return; }
      try {
        const match = bikeData.find(data => data.Bike === selectedBike);
        if (match) {
          setBikeImpact(match.Impact);
        } else {
          setBikeImpact(0);
        }
      } catch (error) {
        console.error(error);
      }
    }
    matchBike(selectedBike);
  }, [selectedBike]);

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
    // Update state with default values if necessary
    setSelectedBike(prev => prev || "Classic");
    setSelectedRegion(prev => prev !== "-" ? prev : "North America");
    setSelectedEating(prev => prev !== "-" ? prev : "Omnivore");
    setSelectedAge(prev => prev || 30);
    setSelectedWeight(prev => prev || 70);
    setSelectedFitness(prev => prev || 3);

    // Wait for state updates to complete before recalculating impacts and creating userSelection object
    setTimeout(() => {
      const matchDiet = (selectedRegion: string | null, selectedEating: string | null) => {
        if (!eatingData) { return; }
        try {
          const match = eatingData.find(data => data.Region === selectedRegion && data.Habit === selectedEating);
          if (match) {
            setSelectedImpact(match.Impact);
          } else {
            setSelectedImpact(0);
          }
        } catch (error) {
          console.error(error);
        }
      }
      matchDiet(selectedRegion, selectedEating);

      const matchBike = (selectedBike: string | null) => {
        if (!bikeData) { return; }
        try {
          const match = bikeData.find(data => data.Bike === selectedBike);
          if (match) {
            setBikeImpact(match.Impact);
          } else {
            setBikeImpact(0);
          }
        } catch (error) {
          console.error(error);
        }
      }
      matchBike(selectedBike);

      const userSelection = {
        gender: selectedGender,
        region: selectedRegion || "North America",
        bike: selectedBike || "Classic",
        eating: selectedEating || "Omnivore",
        age: selectedAge || 30,
        weight: selectedWeight || 70,
        fitness: selectedFitness || 3,
        temperature: temperature,
        pressure: pressure,
        impact: selectedImpact,
        bikeImpact: bikeImpact,
        // steepness: inputSteepness
      };

      console.log(userSelection);
    }, 0);
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
            eating={eatingData}
          />
          <CyclingInput
            selectedBike={selectedBike}
            setSelectedBike={setSelectedBike}
            showModal={showModal}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            handleBikeSelection={handleBikeSelection}
            handleBikeSubmit={handleBikeSubmit} />
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
            <button onClick={handleSubmit} className='border rounded py-2 px-4 hover:border-green-500 duration-200 focus:border-2 focus:ring'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
