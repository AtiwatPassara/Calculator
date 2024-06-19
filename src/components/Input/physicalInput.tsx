
interface PhysicalInputProps {
    selectedGender: string;
    setSelectedGender: (value: string) => void;
}


const PhysicalInput: React.FC<PhysicalInputProps> = ({
    selectedGender,setSelectedGender}) => {
        const selectGender = [
            { title: "Male", value: "male" },
            { title: "Female", value: "female" },
          ];
     return <div>
                Physical Input
                <div className="flex flex-row">
                    <div className="p-2 ">
                        Select Gender
                        <select className="bg-black text-white p-2 mx-2 border border-white rounded-md"
                            value={selectedGender}  onChange={(e) => setSelectedGender(e.target.value)}
                        >
                        {selectGender.map((option) => (
                            <option value={option.value} key={option.value}>
                            {option.title}
                            </option>
                        ))}
                        </select>
                    </div>
                </div>                
            </div>
}

export default PhysicalInput