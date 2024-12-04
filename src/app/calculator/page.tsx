'use client'
import { useEffect, useRef, useState } from "react";
import DietInput from "@/components/Input/dietInput";
import CyclingInput from "@/components/Input/cyclingInput";
import PhysicalInput from "@/components/Input/physicalInput";
import Output from "@/components/output/output";
import { calculateCaloriesSpend } from "@/components/calculation/calories";
import { classicBikeData, cargoBikeData, sportBikeData, transportsData } from "../type/bikeTestData";
import { UserSelection } from "../type/userSelection";
import { ElectricityCountryData } from "../type/countryData";
import { calculatedResult } from "../type/calculationResult";

export interface electricityCountryData {
  id: number,
  region: string,
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

const Calculator: React.FC = () => {
  const [isFormSubmitted,setIsFormSubmitted] = useState<boolean>(false)
  const [terrain, setTerrain] = useState<string>("Flat");
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
  const [bikeImpact, setBikeImpact] = useState<number>(0);
  const [fitnessImpact, setFitnessImpact] = useState<number>(0);
  const [physicalData, setPhysicalData] = useState<physicalData[]>([]);
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
  const [classicBikeData, setClassicBikeData] = useState<classicBikeData[]>([]);
  const [sportBikeData, setSportBikeData] = useState<sportBikeData[]>([]);
  const [cargoBikeData, setCargoBikeData] = useState<cargoBikeData[]>([]);
  const [bikeMaintenance, setBikeMaintenance] = useState<number>(0);
  const [bikeEol, setBikeEol] = useState<number>(0);
  const [bikeEngine, setBikeEngine] = useState<number>(0);
  const [bikeBattery, setBikeBattery] = useState<number>(0);
  const [bikeElectricity, setBikeElectricity] = useState<number>(0);
  const [bikeElectricityCountry, setBikeElectricityCountry] = useState<number>(0);
  const [electricityCountryData, setElectricityCountryData] = useState<electricityCountryData[]>([]);
  const [isCountryRegion, setIsCountryRegion] = useState<boolean>(false);
  const [countryData, setCountryData] = useState<ElectricityCountryData[]>([]);
  const [transportsData, setTransportsData] = useState<transportsData[]>([])
  const defaultCountryData: ElectricityCountryData = {
    name: "-",
    region: "",
    subregion: "",
    latlng: []
  };
  const [electricityCountry, setElectricityCountry] = useState<ElectricityCountryData>(defaultCountryData);
  const [country, setCountry] = useState<string>("-");
  const [bikeCountry, setBikeCountry] = useState<string>("-");
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isRequiredSet]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const result = await response.json();
        const filteredCountries = result.map((country: any) => ({
          name: country.name.common,
          subregion: country.subregion,
          region: country.region,
          latlng: country.latlng,
        }));
        filteredCountries.sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountryData(filteredCountries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCountryData();
  }, []);

  useEffect(() => {
    async function fetchTransportsData() {
      try {
        const res = await fetch('api/transportsData');
        if (!res.ok) { throw new Error('Error fetching data'); }
        const result: transportsData[] = await res.json();
        setTransportsData(result);
      }
      catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError('An unknown error occurred');
        }
      }
    }

    async function fetchElectricityCountryData() {
      try {
        const res = await fetch('api/electricityData');
        if (!res.ok) { throw new Error('Error fetching data'); }
        const result: electricityCountryData[] = await res.json();
        setElectricityCountryData(result);
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

    async function fetchSportBiketData() {
      try {
        const res = await fetch('api/sportBikeData');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const result: sportBikeData[] = await res.json();
        setSportBikeData(result);
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
    fetchTransportsData();
    fetchSportBiketData();
    fetchElectricityCountryData();
    fetchClassicBikeData();
    fetchCargoBikeData();
    fetchRegionData();
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
  }, [selectedRegion, selectedEating, eatingData,isCountryRegion])

  useEffect(() => {
    const matchBike = (selectedBike: string | null) => {
      if (!classicBikeData || !cargoBikeData || !sportBikeData) { return }
      try {
        if (selectedBike === "Classic") {
          const [match] = classicBikeData.filter(data => data.Material === selectedMaterial && data.PowerType === selectedPower)
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
          const [match] = cargoBikeData.filter(data => data.PowerType === selectedPower)
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
        else if (selectedBike === "Sport") {
          const [match] = sportBikeData.filter(data => data.Material === selectedMaterial && data.PowerType === selectedPower)
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
  }, [selectedBike, classicBikeData, cargoBikeData, selectedMaterial, selectedPower,sportBikeData])

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
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    matchPhysical(selectedFitness)
  }, [selectedFitness, physicalData])

  useEffect(() => {
    const matchElectricityCountry = (Region: string) => {
      if (!electricityCountryData) { return }
      try {
        const [match] = electricityCountryData.filter(data => data.region.toLowerCase() === Region.toLowerCase())
        if (match) {
          setBikeElectricityCountry(match.electricity*1000)//to covert unit from kgCo2eq/kwh to gCo2eq/kwh
        }
        else {
          setBikeElectricityCountry(0)
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    if (isCountryRegion) {
      matchElectricityCountry(electricityCountry.name)
    }
    else {
      matchElectricityCountry(electricityCountry.region)
    }
  }, [electricityCountry, electricityCountryData])

  const handleMaterialSelection = (material: string) => {
    setSelectedMaterial(material);
  }

  const handlePowerSelection = (power: string) => {
    setSelectedPower(power);
  }

  useEffect(() => {
    setSelectedMaterial("-");
    setSelectedPower("-")
  }, [selectedBike, setSelectedBike,isCountryRegion])

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
    const updatedBike = selectedBike ?? "Classic";
    const updatedRegion = selectedRegion === "-" ? "North America" : selectedRegion;
    const updatedEating = selectedEating === "-" ? "Omnivore" : selectedEating;
    const updatedAge = selectedAge === 0 ? 30 : selectedAge;
    const updatedWeight = selectedWeight === 0 ? 70 : selectedWeight;
    const updatedFitness = selectedFitness === 0 ? 3 : selectedFitness;
    const updatedGender = selectedGender === "-" ? "male" : selectedGender;
    let updatedGenderValue = selectedGenderValue;
    const updatedSpeed = selectedSpeed === 0 ? 15 : selectedSpeed;
    const updatedHeight = selectedHeight === 0 ? 170 : selectedHeight;
    const updatedDuration = selectedDuration === 0 ? 30 : selectedDuration;
    let updatedMaterial = selectedMaterial === '-' ? "Aluminium" : selectedMaterial;
    const updatedPower = selectedPower === '-' ? 'Mechanical' : selectedPower;
  
    if (updatedGender === 'male') {
      updatedGenderValue = 1;
    } else if (updatedGender === 'female') {
      updatedGenderValue = 0;
    }
  
    if (updatedBike === "Cargo") {
      updatedMaterial = '-'
    }
  
    if (country === '-') {
      setIsRequiredSet(false);
      setFetchError('Please enter a valid location.');
      setIsFormSubmitted(true); // Set form submission state
      return;
    }
  
    const matchDiet = () => {
      if (!eatingData) { return 0; }
      try {
        const match = eatingData.find(data => data.Region === updatedRegion && data.Habit === updatedEating);
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
  
    const matchBike = (): classicBikeData | cargoBikeData | sportBikeData => {
      const noMatchClassicBike: classicBikeData = {
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
      const noMatchCargoBike: cargoBikeData = {
        id: 0,
        PowerType: "",
        Manufacture: 0,
        Maintenance: 0,
        Eol: 0,
        Engine: 0,
        Battery: 0,
        Electricity: 0
      };

      if (!classicBikeData || !cargoBikeData) {
        return updatedBike === 'Classic' ? noMatchClassicBike : noMatchCargoBike;
      }
      try {
        if (updatedBike === "Classic") {
          const match = classicBikeData.find(data => data.Material === updatedMaterial && data.PowerType === updatedPower);
          return match ? match : noMatchClassicBike;
        } else if (updatedBike === "Cargo") {
          const match = cargoBikeData.find(data => data.PowerType === updatedPower);
          return match ? match : noMatchCargoBike;
        } else if (updatedBike === "Sport") {
          const match = sportBikeData.find(data => data.Material === updatedMaterial && data.PowerType === updatedPower);
          return match ? match : noMatchCargoBike;
        }
        return updatedBike === 'Classic' ? noMatchClassicBike : noMatchCargoBike;
      } catch (error) {
        console.error(error);
        return updatedBike === 'Classic' ? noMatchClassicBike : noMatchCargoBike;
      }
    }
  
    const bikeMatch = matchBike();
    const updatedKcalSpend = kcalSpend;
    const updatedBikeImpact = bikeMatch.Manufacture;
    const updatedMaintenance = bikeMatch.Maintenance;
    const updatedEol = bikeMatch.Eol;
    const updatedEngine = bikeMatch.Engine;
    const updatedBattery = bikeMatch.Battery;
    const updatedElectricity = bikeMatch.Electricity;
  
    const createUserSelection = (calculatedImpact: calculatedResult): UserSelection => {
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
          terrain: terrain,
        },
        Diet: {
          region: updatedRegion,
          eating: updatedEating,
          impact: updatedDietImpact,
        },
        Result: {
          dietImpact: updatedDietImpact,
          bikeManufacture: updatedBikeImpact,
          bikeMaintenance: updatedMaintenance,
          bikeEol: updatedEol,
          bikeEngine: updatedEngine,
          bikeBattery: updatedBattery,
          bikeElectricity: updatedElectricity,
          bikeElectricityCountry: bikeElectricityCountry,
          TotalElectricity: updatedElectricity * bikeElectricityCountry,
          kcalSpend: updatedKcalSpend,
        },
        Country: {
          name: electricityCountry.name,
          region: electricityCountry.region,
          subregion: electricityCountry.subregion,
          latlng: electricityCountry.latlng,
        },
        CalculatedResult: {
          BCS: calculatedImpact.BCS,
          ECS: calculatedImpact.ECS,
          DietImpact: calculatedImpact.DietImpact,
          BikeImpact: calculatedImpact.BikeImpact,
          TotalImpact: calculatedImpact.TotalImpact,
        },
      };
    };
    
  
    const defaultCalculatedImpact: calculatedResult = {
      BCS: 0,
      ECS: 0,
      DietImpact: 0,
      BikeImpact: 0,
      TotalImpact: 0,
    };
  
    const initialUserSelection = createUserSelection(defaultCalculatedImpact);
    const caloriesSpend = calculateCaloriesSpend(initialUserSelection);
    const calculatedUserSelection = createUserSelection(caloriesSpend);
  
    setUserInput(calculatedUserSelection);
    setIsSubmitClicked(true);
    setIsFormSubmitted(true); // Set form submission state
    setIsRequiredSet(true); // Mark the required fields as set
    setSelectedGender(updatedGender);
    setSelectedRegion(updatedRegion);
    setSelectedEating(updatedEating);
    setSelectedBike(updatedBike);
    setSelectedAge(updatedAge);
    setSelectedWeight(updatedWeight);
    setSelectedFitness(updatedFitness);
    setSelectedSpeed(updatedSpeed);
    setSelectedHeight(updatedHeight);
    setSelectedDuration(updatedDuration);
    setSelectedMaterial(updatedMaterial);
    setSelectedPower(updatedPower);
    console.log(calculatedUserSelection);
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
    <div className="flex flex-col items-center md:w-full">
      <div className="flex flex-col justify-center gap-1 md:gap-8 border p-6 border-gray-500 w-screen sm:max-w-screen sm:w-max">
      <span className="text-2xl md:text-3xl font-bold text-center">Provide Your Details</span>
        <div className="flex flex-col xl:flex-row justify-center gap-4 xl:gap-4">
          <div className="flex flex-col justify-start gap-4 xl:gap-6 w-full xl:w-1/2 min-h-full flex-grow">
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
              electricityCountry={electricityCountry}
              setElectricityCountry={setElectricityCountry}
              bikeCountry={bikeCountry}
              setBikeCountry={setBikeCountry}
              bikeElectricityCountry={bikeElectricityCountry}
              setBikeElectricityCountry={setBikeElectricityCountry}
              isCountryRegion={isCountryRegion}
              setIsCountryRegion={setIsCountryRegion}
              countryData={countryData}
              terrain={terrain}
              setTerrain={setTerrain}
            />
          </div>
          <div className="flex flex-col justify-start gap-4 xl:gap-6 w-full xl:w-1/2 min-h-full flex-grow">
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
                country={country}
                setCountry={setCountry}
                bikeElectricityCountry={bikeElectricityCountry}
                setBikeElectricityCountry={setBikeElectricityCountry}
                isCountryRegion={isCountryRegion}
                setIsCountryRegion={setIsCountryRegion}
                countryData={countryData} 
                isFormSubmitted={isFormSubmitted}            />
          </div>
        </div>
        {!isRequiredSet && (
          <div className="text-red-500 text-center">
            Please Enter Required Field
          </div>
        )}
        <div className="flex justify-center">
          <button onClick={handleSubmit} className="border rounded py-2 px-4 md:m-0 mt-4 hover:border-green-500 duration-200 focus:border-2 focus:ring">
            Submit
          </button>
        </div>
      </div>
      {isSubmitClicked && isRequiredSet && (
  <div className="w-full" ref={resultRef}>
    <Output userInput={userInput} transportsData={transportsData} />
  </div>
)}
    </div>
  </div>
  );
};

export default Calculator;
