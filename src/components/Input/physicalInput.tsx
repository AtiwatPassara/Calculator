import { useState, useEffect } from "react";
import { WeatherData } from "@/app/type/weatherData"; 
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import spinner icon
import FitnessTable from "../modal/fitnessModal";
import { ElectricityCountryData } from "@/app/type/countryData";
import { UserSelection } from "@/app/type/userSelection";

interface PhysicalInputProps {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: number;
  setSelectedAge: (value: number) => void;
  selectedWeight: number;
  setSelectedWeight: (value: number) => void;
  selectedFitness: number;
  setSelectedFitness: (value: number) => void;
  setTemperature: (value: number) => void; 
  setPressure: (value: number) => void;
  setSelectedHeight: (value: number) => void;
  selectedHeight: number;
  handleOpenTableModal: () => void;
  handleCloseTableModal: () => void;
  showTableModal: boolean;
  userInput: UserSelection | null;
  isSubmitClicked: boolean;
  setIsRequiredSet: (value: boolean) => void;
  isRequiredSet: boolean;
  electricityCountry: ElectricityCountryData;
  setElectricityCountry: (value: ElectricityCountryData) => void;
  country: string;
  setCountry: (value: string) => void;
  bikeElectricityCountry: number
  setBikeElectricityCountry: (value: number) => void;
  isCountryRegion: boolean;
  setIsCountryRegion: (value: boolean) => void
  countryData: ElectricityCountryData[];
  isFormSubmitted: boolean;
}

const PhysicalInput: React.FC<PhysicalInputProps> = ({
  selectedGender,
  setSelectedGender,
  selectedAge,
  setSelectedAge,
  selectedWeight,
  setSelectedWeight,
  setSelectedHeight,
  selectedHeight,
  selectedFitness,
  setSelectedFitness,
  setTemperature,
  setPressure,
  handleCloseTableModal,
  handleOpenTableModal,
  showTableModal,
  userInput,
  isSubmitClicked,
  setIsRequiredSet,
  isRequiredSet,
  electricityCountry,
  setElectricityCountry,
  country,
  setCountry,
  bikeElectricityCountry,
  setBikeElectricityCountry,
  isCountryRegion,
  setIsCountryRegion,
  countryData,
  isFormSubmitted
}) => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [mapLatitude, setMapLatitude] = useState<number | null>(null);
  const [mapLongitude, setMapLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLocationSelected, setIsLocationSelected] = useState<boolean>(true);
  const [isUserLocation, setIsUserLocation] = useState<boolean>(false);

  const notLatin: string[] = ["Guyana",'Suriname','Falkland Islands'];
  const middleEast: string[] = [ "Saudi Arabia","Yemen","Oman","United Arab Emirates","Qatar",
  "Bahrain","Kuwait","Iraq","Jordan","Syria","Lebanon","Israel","Palestine","Iran","Egypt","Turkey"];
  const availableCountry: string[] = ["Canada","Brazil","China","India","United States"];

  useEffect(() => {
    if (countryData.length > 0) {
      const updateCountry = countryData.find((c) => c.name.toLowerCase() === country.toLowerCase());
      if (updateCountry) {
        if (availableCountry.includes(updateCountry.name)) {
          setIsCountryRegion(true);
          setElectricityCountry(updateCountry);
        } else if (!availableCountry.includes(updateCountry.name) && updateCountry.name !== '-') {
          setIsCountryRegion(false);
          if (updateCountry.region.toLowerCase() === 'europe') {
            updateCountry.region = 'europe';
          } else if (updateCountry.region.toLowerCase() === 'americas') {
            updateCountry.region = updateCountry.subregion.toLowerCase();
            if (updateCountry.subregion.toLowerCase() === 'south america' && !notLatin.includes(updateCountry.name)) {
              updateCountry.region = 'latin and caribbean';
            } else if (updateCountry.subregion.toLowerCase() === 'caribbean') {
              updateCountry.region = 'latin and caribbean';
            } else if (updateCountry.subregion.toLowerCase() === 'north america') {
              updateCountry.region = updateCountry.subregion.toLowerCase();
            }
          } else if (updateCountry.region.toLowerCase() === 'asia') {
            updateCountry.region = updateCountry.region.toLowerCase();
            if (middleEast.includes(updateCountry.name)) {
              updateCountry.region = 'middle east';
            }
          } else if (updateCountry.region.toLowerCase() === 'africa') {
            updateCountry.region = updateCountry.region.toLowerCase();
            if (middleEast.includes(updateCountry.name)) {
              updateCountry.region = 'middle east';
            }
          } else {
            updateCountry.region = 'global';
          }
        }
        setElectricityCountry(updateCountry);
      } else {
        setElectricityCountry({ name: '-', region: '-', subregion: '-', latlng: [] });
      }
    }
  }, [countryData, country, setElectricityCountry]);

  useEffect(() => {
    const handleLocationSelect = async () => {
      if (isSubmitClicked && userInput) {
        if (userInput.Physical.temperature !== 0) {
          setIsLocationSelected(true);
          setIsRequiredSet(true);
        } else if (userInput.Physical.temperature === 0) {
          setIsLocationSelected(false);
          setIsRequiredSet(false);
        }
      } else {
        setIsLocationSelected(false);
        setIsRequiredSet(false);
      }
    };
    handleLocationSelect();
  }, [userInput, isSubmitClicked, setIsRequiredSet]);

  useEffect(() => {
    if (countryData.length > 0) {
      const updateCountry = countryData.find((c) => c.name.toLowerCase() === country.toLowerCase());
      if (updateCountry) {
        if (isUserLocation) {
          // Do not update latitude and longitude if user location is used
        } else {
          setLatitude(updateCountry.latlng[0]);
          setLongitude(updateCountry.latlng[1]);
        }
      } else {
        setLatitude(null);
        setLongitude(null);
        setElectricityCountry({ name: '-', region: '-', subregion: '-', latlng: [] });
        setBikeElectricityCountry(0);
      }
    }
  }, [country, countryData, setElectricityCountry, isUserLocation]);

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
      } else {
        setWeatherData(null);
        setTemperature(0);
        setPressure(0);
      }
    };
    fetchWeatherData();
  }, [latitude, longitude, setTemperature, setPressure]);

  useEffect(() => {
    const matchLatlngToCountry = async () => {
      if (mapLatitude !== null && mapLongitude !== null) {
        try {
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${mapLatitude}%2C${mapLongitude}&key=c69fda939c1245c8926f9a22130f348a`);
          const data = await response.json();
          const country = data.results[0]?.components?.country;
          if (country) {
            setCountry(country);
          }
        } catch (error) {
          console.error('Error fetching country:', error);
        }
      }
    };

    matchLatlngToCountry();
  }, [mapLatitude, mapLongitude, setCountry]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setMapLatitude(latitude);
          setMapLongitude(longitude);
          setIsUserLocation(true);
          setLoading(false); // Ensure loading is set to false after updating the position
          try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=c69fda939c1245c8926f9a22130f348a`);
            const data = await response.json();
            const country = data.results[0]?.components?.country;
            if (country) {
              setCountry(country);
            }
          } catch (error) {
            console.error('Error fetching country:', error);
          }
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLoading(false);
          setIsUserLocation(false);
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
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedHeight(Number(value));
  };

  return (
    <div className="flex flex-col justify-start p-2 border rounded m-1 md:m-0">
      <h2 className="text-lg font-bold mb-4">Physical Information</h2>
      <div className="flex flex-col md:flex-row justify-between w-max">
        <div className="p-2">
          Select Gender
          <select
            className="bg-black text-white p-1 m-2 md:p-2 md:mx-2 border border-white rounded-md"
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
        <div className="p-2 flex items-center">
          Fitness Level
          <select
            className="bg-black text-white p-1 m-2 md:p-2 md:mx-2 border border-white rounded-md w-20"
            value={selectedFitness}
            onChange={(e) => setSelectedFitness(Number(e.target.value))}
          >
            {selectFitness.map((option) => (
              <option value={option.value} key={option.value}>
                {option.title}
              </option>
            ))}
          </select>
          <button onClick={handleOpenTableModal}>
            <IoIosInformationCircleOutline className="text-xl" style={{ opacity: 0.7 }} />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:mt-5 justify-between">
        <div className="p-2">
          Age
          <input
            type="number"
            className="bg-black text-white p-1 m-2 md:p-2 md:mx-2 border border-white rounded-md w-20"
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
            className="bg-black text-white p-1 m-2 md:p-2 md:mx-2 border border-white rounded-md w-20"
            value={selectedWeight}
            onChange={handleWeightChange}
            min={0}
            max={999}
          />
          Kg
        </div>
      </div>   
      <div className="flex flex-col md:flex-row md:mt-5 justify-start">
        <div className="p-2">
          Height
          <input
            type="number"
            className="bg-black text-white p-1 m-2 md:p-2 md:mx-2 border border-white rounded-md w-20"
            value={selectedHeight}
            onChange={handleHeightChange}
            min={0}
            max={999}
          />
          Cm
        </div> 
      </div>   
      <div className={`flex flex-col md:flex-row justify-between md:mt-5 ${isFormSubmitted && !isLocationSelected ? 'border border-red-500 rounded p-2' : 'border border-gray-400 rounded p-2'}`}>
        <div className="p-2 flex items-center">
          <span className="text-red-500 text-[15px] mr-1">*</span> Location
          <button onClick={() => { getUserLocation(); setIsUserLocation(true); }} className="border rounded p-2 ml-1">Get Location</button>
        </div>
        <span className="md:flex items-center hidden">or</span>
        <div className="p-2 flex items-center">
          <span className='md:hidden mx-1'>or</span>Country
          <select
            className="bg-black text-white p-1 m-2 md:p-2 md:mx-2 border w-[100px] md:max-w-[150px] border-white rounded-md"
            value={country}
            onChange={(e) => { setCountry(e.target.value); setIsUserLocation(false); }}
          >
            <option value="-" key="-">-</option>
            {countryData.map((option) => (
              <option value={option.name} key={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-col justify-between md:mt-5">
        <div className="p-2 flex items-center">
          <span>Outside Temperature :</span>
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin ml-2" size={24} />
          ) : (
            weatherData && weatherData.main && (
              <p className="ml-2">{weatherData.main.temp}{" "}°C</p>
            )
          )}
        </div>
        <div className="p-2 flex items-center">
          <span>Atmospheric Pressure :</span>
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin ml-2" size={24} />
          ) : (
            weatherData && weatherData.main && (
              <p className="ml-2">{weatherData.main.pressure}{" "}hPa</p>
            )
          )}
        </div>
      </div>
      <FitnessTable 
        handleCloseTableModal={handleCloseTableModal}
        showTableModal={showTableModal}
      />
    </div>
  );
};

export default PhysicalInput;
