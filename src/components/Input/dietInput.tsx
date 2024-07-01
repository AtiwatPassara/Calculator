import { Regions } from "@/components/region/regionselector";

interface EatingHabit{
    id: number;
    Region: string;
    Habit: string;
    Impact: number;
}

interface DietInputprops{
    selectedRegion: string;
    setSelectedRegion: (value: string) => void;
    selectedEating: string;
    setSelectedEating: (value: string) => void;
    eating:  EatingHabit[];
}

const DietInput:React.FC<DietInputprops> = ({
    selectedRegion,setSelectedRegion,selectedEating,setSelectedEating,eating
}) => {

    const eatingBehaviour = [
        {title:"-" , value:"-"},
        {title:"Omnivore" , value:"Omnivore"},
        {title:"Vegetarian" , value:"Vegetarian"},
    ]

    return <div >
                <div className="p-2">
                    <h2 className="text-lg font-bold mb-4">Diet Information</h2>
                    <div className="flex flex-row justify-between">
                        <div className="p-2">
                            Select Your Region
                                <select
                                className="bg-black text-white p-2 mx-2 border border-white rounded-md focus:border-orange-400"
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
                        <div className="p-2">
                            Eating Habits
                                <select
                                className="bg-black text-white p-2 mx-2 border border-white rounded-md focus:border-[#42ddf5]"
                                value={selectedEating}
                                onChange={(e) => setSelectedEating(e.target.value)}
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
}

export default DietInput