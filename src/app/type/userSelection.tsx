import { calculatedResult } from "./calculationResult";
import { ElectricityCountryData } from "./countryData";

export interface Result {
    dietImpact: number,
    bikeManufacture: number,
    bikeMaintenance: number,
    bikeEol: number,
    bikeEngine: number,
    bikeBattery: number,
    bikeElectricity: number,
    bikeElectricityCountry: number,
    TotalElectricity: number,
    kcalSpend: number;
  }
  
  export interface Physical{
    gender: string,
    genderValue: number,
    age: number,
    weight: number,
    fitness: number,
    physicalImpact: number,
    height: number,
    temperature: number,
    pressure: number,
  }
  
  export interface Cycling{
    bike: string | null, 
    material: string | null,
    power: string | null,
    speed: number,
    duration: number,
    bikeImpact: number,
    terrain: string,
  }
  
  export interface Diet{
    region: string,
    eating: string, 
    impact: number,
  }
  
  export interface UserSelection {
    Physical : Physical,
    Cycling : Cycling,
    Diet : Diet,
    Result : Result,
    Country: ElectricityCountryData
    CalculatedResult : calculatedResult
  }

