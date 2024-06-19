import { Regions } from "@/components/region/regionselector";

interface DietInputprops{
    selectedCountry: string;
    setSelectedCountry: (value: string) => void;
}

const DietInput:React.FC<DietInputprops> = ({
    selectedCountry,setSelectedCountry
}) => {
    return <div >
                Diet Input
                <div className="flex flex-row">
                    <div className="p-2 ">
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
                </div>
            </div>
}

export default DietInput