import pool from '@/db/mysql';
import type { NextApiRequest, NextApiResponse } from 'next'
 
type bikeData = {
  id: number;
  Bike: string;
  Impact: number;
}

type ErrorResponse = {
    error: string;
  };
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<bikeData[] | ErrorResponse>) {
    if (req.method === 'GET') {
        try{
            const [row] = await pool.query("SELECT * FROM bike")
            const data = row as bikeData[];
            res.status(200).json(data)}
        catch(error){
            console.error(error)
        }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}