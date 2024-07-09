import React from 'react';
import Image from 'next/image';
import { IoIosClose } from "react-icons/io";
import ClassicModal from '../modal/classicModal'; // Correct import path

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

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-black m-auto p-8 w-[900px] h-[550px] rounded-md shadow-lg border border-[#42ddf5]">
        <div className="flex justify-end">
          <button type="button" className="text-white p-2 rounded" onClick={handleClose} aria-label="Close Modal">
            <IoIosClose size={25} />
          </button>
        </div>
        <div className="flex flex-col items-center mt-5">
          <p className="text-center text-xl border-b-2 pb-2 text-white border-red-500">Select your bike</p>
          <div className="h-full flex justify-center items-center mt-5 p-5 gap-5 rounded-md">
            <button onClick={() => { handleBikeSelection("Classic");}}>
              <div className={`transition-all duration-300 relative w-64 h-64 border p-5 rounded-md ${selectedBike === "Classic" ? "bg-white" : "bg-black"} hover:border-yellow-500 flex items-center justify-center`}>
                <Image src="/asset/classic.png" alt="Classic" width={200} height={200} objectFit="contain" />
                <div className={`transition-all duration-300 ${selectedBike === "Classic" ? "text-black" : "text-white"} absolute bottom-2`}>
                  Classic
                  <button onClick={() => {handleOpenClassic()}} className="border p-2 m-3">Open</button>
                </div>
              </div>
            </button>
            <button onClick={() => handleBikeSelection("Cargo")}>
              <div className={`transition-all duration-300 relative w-90 h-64 border p-5 rounded-md ${selectedBike === "Cargo" ? "bg-white" : "bg-black"} hover:border-yellow-500 flex items-center justify-center`}>
                <Image src="/asset/cargobike.png" alt="Cargo" width={260} height={200} objectFit="contain" />
                <div className={`transition-all duration-300 ${selectedBike === "Cargo" ? "text-black" : "text-white"} absolute bottom-2`}>Cargo</div>
              </div>
            </button>
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