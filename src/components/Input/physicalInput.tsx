import { useState, useEffect } from "react";
import { WeatherData } from "@/app/type/weatherData"; 
import { IoIosInformationCircleOutline } from "react-icons/io";

interface PhysicalInputProps {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: number;
  setSelectedAge: (value: number) => void;
  selectedWeight: number;
  setSelectedWeight: (value: number) => void;
  selectedFitness: number;
  setSelectedFitness: (value: number) => void;
  setTemperature: (value: number | null) => void; 
  setPressure: (value: number | null) => void;
}

const PhysicalInput: React.FC<PhysicalInputProps> = ({
  selectedGender,
  setSelectedGender,
  selectedAge,
  setSelectedAge,
  selectedWeight,
  setSelectedWeight,
  selectedFitness,
  setSelectedFitness,
  setTemperature,
  setPressure,
}) => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude !== null && longitude !== null) {
        setLoading(true); 
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=46424be8ea5885c20fbde4a9795aa9ec`);
          const data: WeatherData = await response.json();
          setWeatherData(data);
          setTemperature(data.main.temp); 
          setPressure(data.main.pressure);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); 
        }
      }
    };
  
    fetchWeatherData();
  }, [latitude, longitude, setTemperature, setPressure]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true); // Start loading when the button is clicked
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLoading(false); // Stop loading if there is an error
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const selectGender = [
    { title: "-", value: "-" },
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
  ];

  const selectFitness = [
    { title: "7", value: 7 },
    { title: "6", value: 6 },
    { title: "5", value: 5 },
    { title: "4", value: 4 },
    { title: "3", value: 3 },
    { title: "2", value: 2 },
    { title: "1", value: 1 },
    { title: "0", value: 0 },
  ];

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setSelectedAge(Number(value));
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3) {
      setSelectedWeight(Number(value));
    }
  }

  return (
    <div>
      <div className="p-2">
        <h2 className="text-lg font-bold mb-4">Physical Info</h2>
        <div className="flex flex-row">
          <div className="p-2">
            Select Gender
            <select
              className="bg-black text-white p-2 mx-2 border border-white rounded-md focus:border-green-500"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              {selectGender.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
            Age
            <input
              type="number"
              className="bg-black text-white p-2 mx-2 border border-white rounded-md w-20 focus:border-red-500 focus:outline-none"
              value={selectedAge}
              onChange={handleAgeChange}
              min={0}
              max={999}
            />
          </div>
          <div className="p-2">
            Weight
            <input
              type="number"
              className="bg-black text-white p-2 mx-2 border border-white rounded-md w-20 focus:border-orange-500 focus:outline-none"
              value={selectedWeight}
              onChange={handleWeightChange}
              min={0}
              max={999}
            />
          </div>
          <div className="p-2 flex items-center">
            Fitness Level
            <select
              className="bg-black text-white p-2 mx-2 border border-white rounded-md w-20 focus:border-[#42ddf5] focus:outline-none"
              value={selectedFitness}
              onChange={(e) => setSelectedFitness(Number(e.target.value))}
            >
              {selectFitness.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
            <button>
              <IoIosInformationCircleOutline size={25} style={{ opacity: 0.7 }} />
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-5">
          <div className="p-2">
            Location :{" "}
            <button onClick={getUserLocation} className="border rounded p-2 focus:ring focus:border-green-500 ml-1">Get my location</button>
          </div>
          <div className="p-2 flex items-center">
            <span>Outside Temperature :</span>
              {loading ? (
                <p className="ml-2">Loading...</p>
              ) : (
              weatherData && weatherData.main && (
              <p className="ml-2">{weatherData.main.temp}{" "}°C</p>
              )
              )}
          </div>

          <div className="p-2 flex items-center">
              <span>Atmospheric Pressure :</span>
              {loading ? (
                <p className="ml-2">Loading....</p>
              ) : (weatherData && weatherData.main &&(
              <p className="ml-2">{weatherData.main.pressure}{" "}hPa</p>))
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalInput;
