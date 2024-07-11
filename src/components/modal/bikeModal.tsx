'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoIosClose } from "react-icons/io";
import ClassicModal from '../modal/classicModal'; // Correct import path

const selectMaterial = [
  { title: "-", value: "-" },
  { title: "Bamboo", value: "ฺbamboo" },
  { title: "Carbon", value: "carbon" },
  { title: "Aluminium", value: "aluminium" }
];

const selectType = [
  { title: "-", value: "-" },
  { title: "Mechanic", value: "mechanic" },
  { title: "Electric", value: "electric" },
];

interface BikeModalProps {
  showModal: boolean;
  handleClose: () => void;
  selectedBike: string | null;
  handleBikeSelection: (bikeType: string) => void;
  handleBikeSubmit: () => void;
  showClassicModal: boolean;
  handleOpenClassic: () => void;
  handleCloseClassic: () => void;
  handleSubmitClassic: () => void;
  handleMaterialSelection: (material: string) => void;
  handlePowerSelection: (power: string) => void;
  selectedMaterial: string | null;
  selectedPower: string | null;
}

const BikeModal: React.FC<BikeModalProps> = ({
  showModal,
  handleClose,
  selectedBike,
  handleBikeSelection,
  handleBikeSubmit,
  showClassicModal,
  handleOpenClassic,
  handleCloseClassic,
  handleSubmitClassic,
  handleMaterialSelection,
  handlePowerSelection,
  selectedMaterial,
  selectedPower,
}) => {
  if (!showModal) return null;

  const [isDisabled,setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const handleDisable = () => {
      if(selectedBike === "Classic"){
        setIsDisabled(false)
      }
      else{
        setIsDisabled(true)
      }
    }
  handleDisable()
  },[selectedBike])

  

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-black m-auto p-8 w-[900px] h-auto rounded-md shadow-lg border border-gray-500">
        <div className="flex justify-end">
          <button type="button" className="text-white p-2 rounded" onClick={handleClose} aria-label="Close Modal">
            <IoIosClose size={25} />
          </button>
        </div>
        <div className="flex flex-col items-center mt-5">
          <p className="text-center text-xl border-b-2 pb-2 text-white border-red-500">Select your bike</p>
          <div className="h-full flex justify-center items-center mt-5 p-5 gap-5 rounded-md">
            <button onClick={() => { handleBikeSelection("Classic");}}>
              <div className={`transition-all duration-300 relative w-80 h-64 border p-5 rounded-md ${selectedBike === "Classic" ? "bg-white" : "bg-black"} hover:border-yellow-500 flex items-center justify-center`}>
                <div style={{ maxWidth: '200px', maxHeight: '200px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src="/asset/classic.png" alt="Classic" width={200} height={200} objectFit="contain" />
                </div>
                <div className={`transition-all duration-300 ${selectedBike === "Classic" ? "text-black" : "text-white"} absolute bottom-2`}>
                  Classic
                </div>
              </div>
            </button>
            <button onClick={() => {handleBikeSelection("Cargo")}}>
              <div className={`transition-all duration-300 relative w-80 h-64 border p-5 rounded-md ${selectedBike === "Cargo" ? "bg-white" : "bg-black"} hover:border-yellow-500 flex items-center justify-center`}>
                <div style={{ maxWidth: '260px', maxHeight: '200px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src="/asset/cargobike.png" alt="Cargo" width={260} height={200} objectFit="contain" />
                </div>
                <div className={`transition-all duration-300 ${selectedBike === "Cargo" ? "text-black" : "text-white"} absolute bottom-2`}>Cargo</div>
              </div>
            </button>
          </div>
          <div className="flex flex-row justify-center gap-3 mt-5">
            <div className='flex items-center p-2 rounded-md'>
              <span className={`text-white ${selectedBike != 'Classic' ? 'text-[#B3B3B3]' : ''}`}>Select Material</span>
              <select
                className="bg-black text-white p-2 border border-white rounded-md focus:border-green-500 m-2"
                onChange={(e) => handleMaterialSelection(e.target.value)}
                
                disabled={isDisabled}
              >
                {selectMaterial.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex items-center p-2 rounded-md'>
              <span className="text-white">Select Type</span>
              <select
                className="bg-black text-white p-2 border border-white rounded-md focus:border-green-500 m-2"
                onChange={(e) => handlePowerSelection(e.target.value)}
                
              >
                {selectType.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="mt-6 bg-black p-2 rounded border-white border hover:border-green-500 hover:text-green-400 duration-300 ease-in-out text-white" onClick={handleBikeSubmit}>
            Choose the bike
          </button>
        </div>
      </div>
      <ClassicModal
        showClassicModal={showClassicModal}
        handleCloseClassic={handleCloseClassic}
        handleSubmitClassic={handleSubmitClassic}
        handleMaterialSelection={handleMaterialSelection}
        handlePowerSelection={handlePowerSelection}
        selectedMaterial={selectedMaterial}
        selectedPower={selectedPower}
      />
    </div>
  );
};

export default BikeModal;
