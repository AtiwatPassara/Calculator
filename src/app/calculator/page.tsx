'use client'
import { useState, useEffect } from "react";
import BehaviorInput from "@/components/Input/behaviourInput";
import DietInput from "@/components/Input/dietInput";
import CyclingInput from "@/components/Input/cyclingInput";
import PhysicalInput from "@/components/Input/physicalInput";
import { WeatherData } from "../type/weatherData"; // Adjust the path as necessary

const Calculator: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>("-");
  const [selectedRegion, setSelectedRegion] = useState<string>("-");
  const [selectedEating, setSelectedEating] = useState<string>("-");
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState<number>(0);
  const [selectedFitness, setSelectedFitness] = useState<number>(0);
  const [inputSteepness, setInputSteepness] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLoading(true); 
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=46424be8ea5885c20fbde4a9795aa9ec`)
        .then(response => response.json())
        .then((data: WeatherData) => {
          setWeatherData(data);
          setLoading(false); 
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false); 
        });
    }
  }, [latitude, longitude]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
      // steepness: inputSteepness
    };

    console.log(userSelection);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center gap-5">
        <button onClick={getUserLocation} className="border rounded py-2 px-4">
          Get My Location
        </button>
        {loading ? (
          <p>Loading...</p> 
        ) : (
          weatherData && weatherData.main && (
            <div>
              <p>Current Temperature: {weatherData.main.temp}°C</p>
            </div>
          )
        )}
        <DietInput 
          selectedCountry={selectedRegion}
          setSelectedCountry={setSelectedRegion}
          selectedEating={selectedEating}
          setSelectedEating={setSelectedEating}/>
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
          getUserLocation={getUserLocation} />
        <div className="flex justify-center">
          <button onClick={handleSubmit} className='border rounded py-2 px-4'>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
