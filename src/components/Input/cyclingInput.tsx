import { MdOutlinePedalBike } from "react-icons/md";
import BikeModal from "../modal/bikeModal";
import ClassicModal from "../modal/classicModal";

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
  showClassicModal: boolean;
  handleOpenClassic: () => void;
  handleCloseClassic: () => void;
  handleSubmitClassic: () => void;
  handlePowerSelection: (power: string) => void;
  selectedPower: string | null;
  handleMaterialSelection: (material: string) => void;
  selectedMaterial: string | null;
}

const CyclingInput: React.FC<CyclingInputProps> = ({
  selectedBike,
  setSelectedBike,
  showModal,
  handleOpenModal,
  handleCloseModal,
  handleBikeSelection,
  handleBikeSubmit,
  setSelectedSpeed,
  selectedSpeed,
  setSelectedDuration,
  selectedDuration,
  showClassicModal,
  handleOpenClassic,
  handleCloseClassic,
  handleSubmitClassic,
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
      <div className="p-2 ">
        <h2 className="text-lg font-bold mb-4">Cycling Information</h2>
        <div className='flex flex-row justify-between '>
          <div className="flex items-center space-x-2 ">
            <label>Select your bike </label>
            <button
              type="button"
              className="bg-white text-black py-2 px-4 rounded-md flex items-center border-2 hover:border-green-500 transition-all hover:scale-110 duration-300 ease-in-out"
              onClick={handleOpenModal}
            >
              <MdOutlinePedalBike size={30} />
            </button>
            <span>:</span>
            <span>{selectedBike ? `${selectedBike} Bike` : "No bike selected"}</span>
          </div>
        </div>
        <div className='flex flex-row justify-between mt-5'>
          <div className="flex items-center ">
            Average Speed : 
            <input
              type="number"
              className="bg-black text-white p-2 mx-2 border border-white rounded-md w-20 focus:border-orange-500 focus:outline-none"
              onChange={handleSpeedChange}
              value={selectedSpeed}
              min={0}
              max={999}
            />
              Km/hr
          </div>
          <div className="flex items-center">
            Duration : 
            <input
              type="number"
              className="bg-black text-white p-2 mx-2 border border-white rounded-md w-20 focus:border-orange-500 focus:outline-none"
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
        showClassicModal={showClassicModal}
        handleOpenClassic={handleOpenClassic} 
        handleCloseClassic={handleCloseClassic} 
        handleSubmitClassic={handleSubmitClassic} 
        handleMaterialSelection={handleMaterialSelection} 
        handlePowerSelection={handlePowerSelection} 
        selectedMaterial={null} selectedPower={null}      />
      <ClassicModal showClassicModal={false} 
       handleCloseClassic={handleCloseClassic}
       handleSubmitClassic={handleSubmitClassic} 
       handleMaterialSelection={handleMaterialSelection} 
       handlePowerSelection={handlePowerSelection} 
       selectedMaterial={selectedMaterial} 
       selectedPower={selectedPower}        />

    </div>
  );
};

export default CyclingInput;
