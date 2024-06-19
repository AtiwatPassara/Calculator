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
}

const CyclingInput: React.FC<CyclingInputProps> = ({
  selectedBike,
  setSelectedBike,
  showModal,
  handleOpenModal,
  handleCloseModal,
  handleBikeSelection,
  handleBikeSubmit,
}) => {
  return (
    <div>
      <div className="p-2">
        <h2 className="text-lg font-bold mb-4">Cycling Info</h2>
        <div className="flex items-center space-x-2">
          <label>Select your bike </label>
          <button
            type="button"
            className="bg-white text-black py-2 px-4 rounded-md flex items-center border-2 transition duration-300 ease-in-out hover:border-green-500"
            onClick={handleOpenModal}
          >
            <MdOutlinePedalBike size={30} />
          </button>
          <span>:</span>
          <span>{selectedBike ? `${selectedBike} Bike` : "No bike selected"}</span>
        </div>
      </div>
      <BikeModal
        showModal={showModal}
        handleClose={handleCloseModal}
        selectedBike={selectedBike}
        handleBikeSelection={handleBikeSelection}
        handleBikeSubmit={handleBikeSubmit}
      />
    </div>
  );
};

export default CyclingInput;
