import { MdOutlinePedalBike } from "react-icons/md";
import BikeModal from "../modal/bikeModal";

interface CyclingInputProps {
  selectedBike: string | null;
  setSelectedBike: (value: string | null) => void;
  showModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleBikeSelection: (bikeType: string) => void;
  handleBikeSubmit: () => void;
  setSelectedSpeed: (value: number) => void;
  selectedSpeed: number;
  setSelectedDuration: (value: number) => void;
  selectedDuration: number;
  handlePowerSelection: (power: string) => void;
  selectedPower: string ;
  handleMaterialSelection: (material: string) => void;
  selectedMaterial: string;
}

const CyclingInput: React.FC<CyclingInputProps> = ({
  selectedBike,
  showModal,
  handleOpenModal,
  handleCloseModal,
  handleBikeSelection,
  handleBikeSubmit,
  setSelectedSpeed,
  selectedSpeed,
  setSelectedDuration,
  selectedDuration,
  handlePowerSelection,
  selectedPower,
  handleMaterialSelection,
  selectedMaterial,

}) => {

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedSpeed(Number(value));
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =e.target.value;
    setSelectedDuration(Number(value));
  }

  return (
    <div>
      <div className="p-2 border rounded m-1 md:m-0">
        <h2 className="text-lg font-bold mb-4">Cycling Information</h2>
        <div className='flex flex-col sm:flex-row justify-between '>
          <div className="flex items-center md:space-x-2 space-x-1 p-2">
            <label>Select bike</label>
            <button
              type="button"
              className="bg-white text-black md:py-2 md:px-4 rounded-md px-2 py-1 flex items-center border-2 hover:border-green-500 transition-all hover:scale-110 duration-300 ease-in-out"
              onClick={handleOpenModal}
            >
              <MdOutlinePedalBike className="text-2xl md:text-3xl" />
            </button>
            <span>:</span>
            <span>{selectedBike ? `${selectedBike} Bike` : "No bike selected"}</span>
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between md:mt-5'>
          <div className="flex items-center p-2">
            Average Speed : 
            <input
              type="number"
              className="bg-black text-white p-1 m-2 md:p-2 md:mx-2 border border-white rounded-md w-[60px] md:w-20 focus:border-orange-500 focus:outline-none"
              onChange={handleSpeedChange}
              value={selectedSpeed}
              min={0}
              max={999}
            />
              Km/hr
          </div>
          <div className="flex items-center p-2">
            Duration : 
            <input
              type="number"
              className="bg-black text-white p-1 m-2 md:p-2 md:mx-2 border border-white rounded-md w-[60px] md:w-20 focus:border-orange-500 focus:outline-none"
              min={0}
              max={999}
              onChange={handleDurationChange}
              value={selectedDuration}
            />
              Minute
          </div>
        </div>
      </div>
      <BikeModal
        showModal={showModal}
        handleClose={handleCloseModal}
        selectedBike={selectedBike}
        handleBikeSelection={handleBikeSelection}
        handleBikeSubmit={handleBikeSubmit}
        handleMaterialSelection={handleMaterialSelection} 
        handlePowerSelection={handlePowerSelection} 
        selectedMaterial={selectedMaterial} selectedPower={selectedPower}      />
    </div>
  );
};

export default CyclingInput;
