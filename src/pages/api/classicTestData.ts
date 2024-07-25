import pool from '@/db/mysql';
import type { NextApiRequest, NextApiResponse } from 'next'

type classicTestData = {
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
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<classicTestData[] | ErrorResponse>) {
  if (req.method === 'GET') {
    try{
        const [rows] = await pool.query("SELECT * FROM classictest")
        const data = rows as classicTestData[];
        res.status(200).json(data)}
        catch(error){
            console.error(error)
        }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}