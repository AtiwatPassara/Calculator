import pool from '@/db/mysql';
import type { NextApiRequest, NextApiResponse } from 'next'

type classicBikeData = {
    id: number;
    Material: string;
    PowerType: string;
    Impact: number; 
    Manufacture: number; 
    Maintenance: number;
    Eol: number;
    Engine: number;
    attery: number;
    Electricity: number;
}

type ErrorResponse = {
    error: string;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<classicBikeData[] | ErrorResponse>) {
  if (req.method === 'GET') {
    try{
        const [rows] = await pool.query("SELECT * FROM classicbike")
        const data = rows as classicBikeData[];
        res.status(200).json(data)}
        catch(error){
            console.error(error)
        }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}