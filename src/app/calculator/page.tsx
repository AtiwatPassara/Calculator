'use client'
import { useEffect, useRef, useState } from "react";
import DietInput from "@/components/Input/dietInput";
import CyclingInput from "@/components/Input/cyclingInput";
import PhysicalInput from "@/components/Input/physicalInput";
import Output from "@/components/output/output";
import { calculateCaloriesSpend } from "@/components/calculation/calories"
import { classicTestData, cargoTestData } from "../type/bikeTestData";
import { UserSelection } from "../type/userSelection";
import { CountryData } from "../type/countryData";

export interface electricityData {
  id : number,
  country: string,
  electricity: number
}

export interface physicalData {
  id: number;
  Fitness: number;
  Impact: number;
}

export interface eatingData {
  id: number;
  Region: string;
  Habit: string;
  Impact: number;
}

export interface classicBikeData {
  id: number;
  Material: string;
  PowerType: string;
  Impact: number;
}

export interface cargoBikeData {
  id: number;
  PowerType: string;
  Impact: number;
}

const Calculator: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>("-");
  const [selectedRegion, setSelectedRegion] = useState<string>("-");
  const [selectedEating, setSelectedEating] = useState<string>("-");
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState<number>(0);
  const [selectedFitness, setSelectedFitness] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [pressure, setPressure] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTableModal, setShowTableModal] = useState<boolean>(false);
  const [eatingData, setEatingData] = useState<eatingData[]>([]);
  const [selectedImpact, setSelectedImpact] = useState<number>(0);
  const [classicBikeData, setClassicBikeData] = useState<classicBikeData[]>([])
  const [cargoBikeData, setCargoBikeData] = useState<cargoBikeData[]>([])
  const [bikeImpact, setBikeImpact] = useState<number>(0)
  const [fitnessImpact, setFitnessImpact] = useState<number>(0);
  const [physicalData, setPhysicalData] = useState<physicalData[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<UserSelection | null>(null);
  const [selectedSpeed, setSelectedSpeed] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<number>(0);
  const [selectedHeight, setSelectedHeight] = useState<number>(0);
  const [selectedPower, setSelectedPower] = useState<string>("-");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("-");
  const [selectedGenderValue, setSelectedGenderValue] = useState<number>(1);
  const [kcalSpend, setKcalSpend] = useState<number>(0);
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  const [isRequiredSet, setIsRequiredSet] = useState<boolean>(false);
  const [classicTestData, setClassicTestData] = useState<classicTestData[]>([])
  const [cargoTestData, setCargoTestData] = useState<cargoTestData[]>([])
  const [bikeMaintenance, setBikeMaintenance] = useState<number>(0)
  const [bikeEol, setBikeEol] = useState<number>(0)
  const [bikeEngine, setBikeEngine] = useState<number>(0)
  const [bikeBattery, setBikeBattery] = useState<number>(0)
  const [bikeElectricity, setBikeElectricity] = useState<number>(0)
  const [electricityData,setElectricityData] = useState<electricityData[]>([])
  const defaultCountryData: CountryData = {
    name: "-",
    region: "",
    subregion: "",
    latlng: []
  }
  const [electricityCountry,setElectricityCountry] = useState<CountryData>(defaultCountryData)
  const resultRef = useRef<HTMLDivElement>(null);

 

  useEffect(() => {
    if(resultRef.current){
      resultRef.current.scrollIntoView({behavior : 'smooth'});
    }
  },[isRequiredSet])
  
  useEffect(() => {
    async function fetchElectricityData() {
      try{
        const res = await fetch('api/electricityData');
        if(!res.ok){throw new Error('Error fetching data');}
        const result : electricityData[] = await res.json();
        setElectricityData(result);
      }
      catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }

    async function fetchClassicTestData() {
      try {
        const res = await fetch('api/classicTestData');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const result: classicTestData[] = await res.json();
        setClassicTestData(result);
      }
      catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }

    async function fetchCargoTestData() {
      try {
        const res = await fetch('api/cargoTestData');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const result: cargoTestData[] = await res.json();
        setCargoTestData(result);
      }
      catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }

    async function fetchClassicBikeData() {
      try {
        const res = await fetch('api/classicBikeData');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const result: classicBikeData[] = await res.json();
        setClassicBikeData(result);
      }
      catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }

    async function fetchCargoBikeData() {
      try {
        const res = await fetch('api/cargoBikeData');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const result: cargoBikeData[] = await res.json();
        setCargoBikeData(result);
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
      try {
        const res = await fetch('/api/physicalData');
        if (!res.ok) {
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
    fetchElectricityData()
    fetchClassicTestData();
    fetchCargoTestData();
    fetchCargoBikeData();
    fetchRegionData();
    fetchClassicBikeData();
    fetchPhysicalData();
  }, []);

  useEffect(() => {
    const matchDiet = (selectedRegion: string | null, selectedEating: string | null) => {
      if (!eatingData) { return }
      try {
        const [match] = eatingData.filter(data => data.Region === selectedRegion && data.Habit === selectedEating)
        if (match) {
          setSelectedImpact(match.Impact)
        }
        else {
          setSelectedImpact(0)
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    matchDiet(selectedRegion, selectedEating)
  }, [selectedRegion, selectedEating, eatingData])

  useEffect(() => {
    const matchBike = (selectedBike: string | null) => {
      if (!classicTestData || !cargoTestData) { return }
      try {
        if (selectedBike === "Classic") {
          const [match] = classicTestData.filter(data => data.Material === selectedMaterial && data.PowerType === selectedPower)
          if (match) {
            setBikeImpact(match.Manufacture)
            setBikeMaintenance(match.Maintenance)
            setBikeEol(match.Eol)
            setBikeEngine(match.Engine)
            setBikeBattery(match.Battery)
            setBikeElectricity(match.Electricity)
          }
          else {
            setBikeImpact(0)
          }
        }
        else if (selectedBike === "Cargo") {
          const [match] = cargoTestData.filter(data => data.PowerType === selectedPower)
          if (match) {
            setBikeImpact(match.Manufacture)
            setBikeMaintenance(match.Maintenance)
            setBikeEol(match.Eol)
            setBikeEngine(match.Engine)
            setBikeBattery(match.Battery)
            setBikeElectricity(match.Electricity)
          }
          else {
            setBikeImpact(0)
          }
        }
        else { return }
      }
      catch (error) {
        console.error(error)
      }

    }
    matchBike(selectedBike)
  }, [selectedBike, classicBikeData, cargoBikeData, selectedMaterial, selectedPower])

  useEffect(() => {
    const matchPhysical = (selectedFitness: number | null) => {
      if (!physicalData) { return }
      try {
        const [match] = physicalData.filter(data => data.Fitness === selectedFitness)
        if (match) {
          setFitnessImpact(match.Impact)
        }
        else {
          setFitnessImpact(0)
          console.log(physicalData)
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    matchPhysical(selectedFitness)
  }, [selectedFitness, physicalData])


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
    let updatedGenderValue = selectedGenderValue;
    let updatedSpeed = selectedSpeed === 0 ? 15 : selectedSpeed;
    let updatedHeight = selectedHeight === 0 ? 170 : selectedHeight;
    let updatedDuration = selectedDuration === 0 ? 30 : selectedDuration;
    let updatedMaterial = selectedMaterial === '-' ? "Aluminium" : selectedMaterial;
    let updatedPower = selectedPower === '-' ? 'Mechanical' : selectedPower;

    if (updatedGender === 'male') {
      updatedGenderValue = 1;
    }
    else if (updatedGender === 'female') {
      updatedGenderValue = 0;
    }

    if (updatedBike === "Cargo") {
      updatedMaterial = '-'
    }

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

    const matchBike = (): classicTestData | cargoTestData => {
      const noMatchClassicBike: classicTestData = {
        id: 0,
        Material: "",
        PowerType: "",
        Manufacture: 0,
        Maintenance: 0,
        Eol: 0,
        Engine: 0,
        Battery: 0,
        Electricity: 0
      };
      const noMatchCargoBike: cargoTestData = {
        id: 0,
        PowerType: "",
        Manufacture: 0,
        Maintenance: 0,
        Eol: 0,
        Engine: 0,
        Battery: 0,
        Electricity: 0
      };
    
      if (!classicTestData || !cargoTestData) { 
        return updatedBike === 'Classic' ? noMatchClassicBike : noMatchCargoBike; 
      }
      try {
        if (updatedBike === "Classic") {
          const match = classicTestData.find(data => data.Material === updatedMaterial && data.PowerType === updatedPower);
          return match ? match : noMatchClassicBike;
        } else if (updatedBike === "Cargo") {
          const match = cargoTestData.find(data => data.PowerType === updatedPower);
          return match ? match : noMatchCargoBike;
        }
        return updatedBike === 'Classic' ? noMatchClassicBike : noMatchCargoBike; 
      } catch (error) {
        console.error(error);
        return updatedBike === 'Classic' ? noMatchClassicBike : noMatchCargoBike; 
      }
    }

    const updatedBikeImpact = matchBike().Manufacture
    const updatedMaintenance = matchBike().Maintenance
    const updatedEol = matchBike().Eol
    const updatedEngine = matchBike().Engine
    const updatedBattery = matchBike().Battery
    const updatedElectricity = matchBike().Electricity   

    // Update states with default values and impacts
    setSelectedBike(updatedBike);
    setSelectedRegion(updatedRegion);
    setSelectedEating(updatedEating);
    setSelectedAge(updatedAge);
    setSelectedWeight(updatedWeight);
    setSelectedFitness(updatedFitness);
    setSelectedGender(updatedGender);
    setSelectedGenderValue(updatedGenderValue);
    setSelectedSpeed(updatedSpeed);
    setSelectedHeight(updatedHeight);
    setSelectedDuration(updatedDuration);
    setSelectedMaterial(updatedMaterial);
    setSelectedPower(updatedPower);
    setBikeImpact(updatedBikeImpact);  // Update bike impact immediately
    setBikeMaintenance(updatedMaintenance);
    setBikeEol(updatedEol)
    setBikeEngine(updatedEngine);
    setBikeBattery(updatedBattery);
    setBikeElectricity(updatedElectricity);   

    const createUserSelection = (kcalSpend: number): UserSelection => {
      return {
        Physical: {
          gender: updatedGender,
          genderValue: updatedGenderValue,
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
        },
        Result: {
          kcalSpend: kcalSpend,
          dietImpact: updatedDietImpact,
          bikeImpact: updatedBikeImpact,
          bikeMaintenance: updatedMaintenance,
          bikeEol: updatedEol,
          bikeEngine: updatedEngine,
          bikeBattery: updatedBattery,
          bikeElectricity: updatedElectricity,
        },
        Country: {
          name : electricityCountry.name,
          region: electricityCountry?.region,
          subregion: electricityCountry?.subregion,
          latlng: electricityCountry?.latlng,
        }
      }
    };

    const initialUserSelection = createUserSelection(0)
    const caloriesSpend = calculateCaloriesSpend(initialUserSelection)
    const calculatedUserSelection = createUserSelection(caloriesSpend)

    // Update the userInput state
    setUserInput(calculatedUserSelection);

    // Log the userSelection object
    console.log(calculatedUserSelection);
    console.log(caloriesSpend)
    setIsSubmitClicked(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="flex flex-col items-center md:w-full">
        <span className="text-2xl md:text-3xl m-5 font-bold text-center">Provide Your Details</span>
        <div className="flex flex-col justify-center gap-1 m-1 md:gap-8 md:m-9 border p-6 border-gray-500 w-screen sm:max-w-screen sm:w-max">
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
            userInput={userInput}
            isSubmitClicked={isSubmitClicked}
            isRequiredSet={isRequiredSet}
            setIsRequiredSet={setIsRequiredSet}
            electricityCountry={electricityCountry}
            setElectricityCountry={setElectricityCountry}
          />
          {!isRequiredSet &&
            <div className="text-red-500 text-center">
              Please Enter Required Field
            </div>}
          <div className="flex justify-center">
            <button onClick={() => handleSubmit()} className='border rounded py-2 px-4 md:m-0 mt-4 hover:border-green-500 duration-200 focus:border-2 focus:ring'>Submit</button>
          </div>
        </div>
        {isRequiredSet && <div className="w-full" ref={resultRef} >
          <Output
            userInput={userInput} />
        </div>}
      </div>
    </div>
  );
};

export default Calculator;
