// components/BikeModal.tsx
import React from 'react';
import Image from 'next/image';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface BikeModalProps {
  showModal: boolean;
  handleClose: () => void;
  selectedBike: string | null;
  handleBikeSelection: (bikeType: string) => void;
  handleBikeSubmit: () => void;
}

const BikeModal: React.FC<BikeModalProps> = ({
  showModal,
  handleClose,
  selectedBike,
  handleBikeSelection,
  handleBikeSubmit,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-black m-auto p-8 w-[900px] h-[550px] rounded-md shadow-lg border-2 border-white">
        <div className="flex justify-end">
          <button type="button" className="text-white p-2 rounded" onClick={handleClose} aria-label="Close Modal">
            <IoMdCloseCircleOutline size={25} />
          </button>
        </div>
        <div className="flex flex-col items-center mt-5">
          <p className="text-center text-xl border-b-2 pb-2 text-white">Select your bike</p>
          <div className="h-full flex justify-center items-center mt-5 p-5 gap-5 rounded-md">
            <button onClick={() => handleBikeSelection("Mechanical")}>
              <div className={`transition-all duration-300 relative w-64 h-64 border-2 p-5 rounded-md ${selectedBike === "Mechanical" ? "bg-white" : "bg-black"}`}>
                <Image src="/asset/mechanic.png" alt="bike" layout="fill" objectFit="contain" />
                <div className={`transition-all duration-300 ${selectedBike === "Mechanical" ? "text-black" : "text-white"}`}>Mechanical</div>
              </div>
            </button>
            <button onClick={() => handleBikeSelection("Electrical")}>
              <div className={`transition-all duration-300 relative w-64 h-64 border-2 p-5 rounded-md ${selectedBike === "Electrical" ? "bg-white" : "bg-black"}`}>
                <Image src="/asset/electric1.png" alt="bike" layout="fill" objectFit="contain" />
                <div className={`transition-all duration-300 ${selectedBike === "Electrical" ? "text-black" : "text-white"}`}>Electrical</div>
              </div>
            </button>
            <button onClick={() => handleBikeSelection("Cargo")}>
              <div className={`transition-all duration-300 relative w-64 h-64 border-2 p-5 rounded-md ${selectedBike === "Cargo" ? "bg-white" : "bg-black"}`}>
                <Image src="/asset/cargo.png" alt="bike" layout="fill" objectFit="contain" />
                <div className={`transition-all duration-300 ${selectedBike === "Cargo" ? "text-black" : "text-white"}`}>Cargo</div>
              </div>
            </button>
          </div>
          <button className="mt-6 bg-green-500 p-2 rounded text-white" onClick={handleBikeSubmit}>
            Choose the bike
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeModal;
