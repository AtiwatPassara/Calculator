interface ClassicModalProps {
    showClassicModal: boolean;
    handleCloseClassic: () => void;
    handleSubmitClassic: () => void;
    handleMaterialSelection: (material: string) => void;
    handlePowerSelection: (power: string) => void;
    selectedMaterial: string | null;
    selectedPower: string | null;
}

const ClassicModal: React.FC<ClassicModalProps> = ({
    showClassicModal, 
    handleCloseClassic,
    handleSubmitClassic,
    handleMaterialSelection,
    handlePowerSelection,
    selectedMaterial,
    selectedPower,}) => {

    
    
    if(!showClassicModal) {return null};
    return (
                <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                    ok
                    <button className="border" onClick={handleCloseClassic}>
                        close
                    </button>
                </div>
                
           )
}

export default ClassicModal