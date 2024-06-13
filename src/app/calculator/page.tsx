import Link from "next/link";

const Calculator : React.FC = () => {

    const selectGender = [
        {title : "Male", value : "a"},
        {title : "Female", value : "b"},
        

    ]

    return <div className="flex flex-row place-items-center">
                <div >
                    Select Gender
                    <select className="bg-black">
                        {selectGender.map((option) => (<option value="option.value" key="option.value">{option.value}</option>))}
                    </select>
                </div>
                <Link href="?modal=true">
                    <button type="button" className="bg-blue-500 text-white p-2">Open Modal</button>
                </Link>
            </div>
}

export default Calculator;