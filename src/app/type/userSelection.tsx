import { CountryData } from "./countryData";

export interface Result {
    kcalSpend: number,
    dietImpact: number,
    bikeImpact: number,
    bikeMaintenance: number,
    bikeEol: number,
    bikeEngine: number,
    bikeBattery: number,
    bikeElectricity: number,
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
    Country: CountryData
  }

