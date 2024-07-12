import pool from '@/db/mysql';
import type { NextApiRequest, NextApiResponse } from 'next'

type cargoBikeData = {
    id: number;
    PowerType: string;
    Impact: number;
}

type ErrorResponse = {
    error: string;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<cargoBikeData[] | ErrorResponse>) {
  if (req.method === 'GET') {
    try{
        const [rows] = await pool.query("SELECT * FROM cargobike")
        const data = rows as cargoBikeData[];
        res.status(200).json(data)}
        catch(error){
            console.error(error)
        }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}