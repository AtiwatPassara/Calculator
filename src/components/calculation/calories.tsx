import { UserSelection } from "../../app/type/userSelection";

export const calculateCaloriesSpend = (userSelection: UserSelection) => {

    const { Physical, Cycling, Diet } = userSelection;
    const Vo2Max = 0.133*Physical.age - 0.005*(Physical.age**2) + 11.403*Physical.genderValue + 1.463*Physical.fitness + (9.17*Physical.height)/100 - 0.254*Physical.weight + 34.142; 
    const MaxAerobicPower = (Vo2Max*20.9)/4;
    if(Cycling.power === 'Mechanical'){
        const BikePower = 3.2*(Cycling.speed/3.6) + 0.0725*(Physical.pressure * (Cycling.speed/3.6)**3/((Physical.temperature + 273)*1.33)) ;
        const PowerVo2Max = (BikePower*100)/MaxAerobicPower;    
        let LipidUsePercent: number = 0;

        if (PowerVo2Max > 80) {
            LipidUsePercent = 0;
        } else if (PowerVo2Max > 70 && PowerVo2Max <= 80) {
            LipidUsePercent = 10;
        } else if (PowerVo2Max > 60 && PowerVo2Max <= 70) {
            LipidUsePercent = 20;
        } else if (PowerVo2Max > 50 && PowerVo2Max <= 60) {
            LipidUsePercent = 30;
        } else if (PowerVo2Max <= 50) {
            LipidUsePercent = 80;
        }

        const JoulesExpended = (BikePower*60*Cycling.duration*4)/1000;
        const KcalSpend = JoulesExpended/4;
        // const gramsLipid = (KcalSpend*100)/(LipidUsePercent*9) 
        // const gramsCarbohydrate = ((100 - LipidUsePercent)*(KcalSpend))/(100*4)
        const caloriesSpend = KcalSpend/((Cycling.duration/60)*Cycling.speed);
        return caloriesSpend
    }
    else{
        const caloriesSpend=1
        return caloriesSpend
    }
  };