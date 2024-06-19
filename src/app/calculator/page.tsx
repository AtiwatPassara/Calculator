'use client'
import { useState } from "react";
import { countries } from "@/components/country/countryselector";
import { MdOutlinePedalBike } from "react-icons/md";
import BikeModal from "@/components/modal/bikeModal";
import { useForm } from "react-hook-form";
import { register } from "module";

const Calculator: React.FC = () => {
  const selectGender = [
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
  ];

  const [selectedGender, setSelectedGender] = useState<string>("-");
  const [selectedCountry, setSelectedCountry] = useState<string>("-");
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
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

  const handleSubmit = () => {
    const userSelection = {
      gender: selectedGender,
      country: selectedCountry,
      bike: selectedBike,
    };

    console.log(userSelection);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center gap-5">
        <div>
          Input 1
          <div className="flex flex-row place-items-center gap-4 ">
            <div className="p-2 ">
              Select Gender
              <select
                className="bg-black text-white p-2 mx-2 border-2 border-white rounded-md"
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
            <div>
              Select Country
              <select
                className="bg-black text-white p-2 mx-2 border-2 border-white rounded-md"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((option) => (
                  <option value={option.code} key={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select your bike{" "}</label>
             
                <button
                  type="button"
                  className="bg-white text-black p-2 rounded-md"
                  onClick={handleOpenModal}    >
                  <MdOutlinePedalBike />
                </button>
                {" "} : {selectedBike}
              
            </div>
          </div>
        </div>

        <div>Input 2</div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
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

export default Calculator;
