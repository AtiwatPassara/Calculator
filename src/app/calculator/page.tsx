'use client'
import { useState } from "react";
import BehaviorInput from "@/components/Input/behaviourInput";
import DietInput from "@/components/Input/dietInput";
import CyclingInput from "@/components/Input/cyclingInput";
import PhysicalInput from "@/components/Input/physicalInput";

const Calculator: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>("-");
  const [selectedCountry, setSelectedCountry] = useState<string>("-");
  const [selectedEating, setSelectedEating] = useState<string>("-");
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const [inputSteepness, setInputSteepness] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  

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
    setInputSteepness(steepness)
  }


  const handleSubmit = () => {
    const userSelection = {
      gender: selectedGender,
      country: selectedCountry,
      bike: selectedBike,
      eating: selectedEating,
      // steepness: inputSteepness
    };

    console.log(userSelection);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center gap-5">
        <DietInput 
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
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
          setSelectedGender={setSelectedGender}/>
        <div className="flex justify-center">
          <button onClick={handleSubmit} className='border rounded py-2 px-4'>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
