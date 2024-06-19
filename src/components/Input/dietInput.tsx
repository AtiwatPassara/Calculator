import { Regions } from "@/components/region/regionselector";

interface DietInputprops{
    selectedCountry: string;
    setSelectedCountry: (value: string) => void;
    selectedEating: string;
    setSelectedEating: (value: string) => void;
}

const DietInput:React.FC<DietInputprops> = ({
    selectedCountry,setSelectedCountry,selectedEating,setSelectedEating
}) => {

    const eatingBehaviour = [
        {title:"-" , value:"-"},
        {title:"Omnivore" , value:"omni"},
        {title:"Vegetarian" , value:"vegan"},
    ]

    return <div >
                <div className="p-2">
                    <h2 className="text-lg font-bold mb-4">Diet Info</h2>
                    <div className="flex flex-row">
                        <div className="p-2">
                            Select Region
                                <select
                                className="bg-black text-white p-2 mx-2 border border-white rounded-md"
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                >
                                    {Regions.map((option) => (
                                        <option value={option.code} key={option.name}>
                                        {option.name}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        <div className="p-2">
                            Eating Behaviour
                                <select
                                className="bg-black text-white p-2 mx-2 border border-white rounded-md"
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