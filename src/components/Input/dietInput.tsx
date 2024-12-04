import { Regions } from "@/components/region/regionselector";

interface EatingHabit {
  id: number;
  Region: string;
  Habit: string;
  Impact: number;
}

interface DietInputProps {
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
  selectedEating: string;
  setSelectedEating: (value: string) => void;
  eating: EatingHabit[];
}

const DietInput: React.FC<DietInputProps> = ({
  selectedRegion,
  setSelectedRegion,
  selectedEating,
  setSelectedEating,
  eating
}) => {

  const eatingBehaviour = [
    { title: "-", value: "-" },
    { title: "Omnivore", value: "Omnivore" },
    { title: "Vegetarian", value: "Vegetarian" },
  ];

  return (
    <div>
      <div className="p-2 border rounded m-1 md:m-0">
        <h2 className="text-lg font-bold mb-4">Diet Information</h2>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="p-2">
            Region
            <select
              className="bg-black text-white p-1 mx-1 md:p-2 md:mx-2 border w-[100px] md:w-[120px]  border-white rounded-md focus:border-orange-400"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {Regions.map((option) => (
                <option value={option.name} key={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2 mt-3 md:mt-0">
            Eating Habits
            <select
              className="bg-black text-white p-1 mx-1 md:p-2 md:mx-2 border w-[100px] md:w-[120px] border-white rounded-md focus:border-[#42ddf5]"
              value={selectedEating}
              onChange={(e) => setSelectedEating(e.target.value)}
              required
            >
              {eatingBehaviour.map((option) => (
                <option value={option.value} key={option.title}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietInput;
