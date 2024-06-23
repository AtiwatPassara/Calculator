import React from 'react';

interface PhysicalInputProps {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: number;
  setSelectedAge: (value: number) => void;
  selectedWeight: number;
  setSelectedWeight: (value: number) => void;
  selectedFitness: number;
  setSelectedFitness: (value: number) => void;
  getUserLocation: () => void;
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
  getUserLocation
}) => {

  const selectGender = [
    { title: "-", value: "-" },
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
  ];

const selectFitness = [
    {title: "7", value: 7},
    {title: "6", value: 6},
    {title: "5", value: 5},
    {title: "4", value: 4},
    {title: "3", value: 3},
    {title: "2", value: 2},
    {title: "1", value: 1},
    {title: "0", value: 0},
]

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
              className="bg-black text-white p-2 mx-2 border border-white rounded-md"
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
              className="bg-black text-white p-2 mx-2 border border-white rounded-md w-20"
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
              className="bg-black text-white p-2 mx-2 border border-white rounded-md w-20"
              value={selectedWeight}
              onChange={handleWeightChange}
              min={0}
              max={999}
            />
          </div>
          <div className="p-2">
            Fitness Level
            <select className="bg-black text-white p-2 mx-2 border border-white rounded-md w-20" value={selectedFitness}
              onChange={(e) => setSelectedFitness(Number(e.target.value))}>
                {selectFitness.map((options) => (<option value={options.value} title={options.title}>
                        {options.title}</option>))}
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="p-2">
            Location :{" "}
            <button onClick={getUserLocation} className="border rounded">Get my location</button>
          </div>
          <div className="p-2">
            Outside Temperature
            <select />
          </div>
          <div className="p-2">
            Atmospheric Pressure
            <select>
              
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalInput;
