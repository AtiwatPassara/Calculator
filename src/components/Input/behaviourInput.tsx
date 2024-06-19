interface BehaviourInputProps{
    inputSteepness : number,
    setInputSteepness : (value: number) => void,
    handleSteepInput : (value: number) => void
}


const BehaviorInput: React.FC<BehaviourInputProps> = ({
    inputSteepness,
    setInputSteepness,
    handleSteepInput
}) => {

    return <div>
                <div>Behavior Input</div>
                <div>
                    <label>
                        Steepness: <input name="steepnessInput" value={inputSteepness} onChange={(e) => setInputSteepness(Number(e.target.value)) } type="number" className="rounded bg-black border-red-500"/>
                    </label>
                </div>
            </div>
}

export default BehaviorInput;