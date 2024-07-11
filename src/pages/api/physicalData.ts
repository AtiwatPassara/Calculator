import pool from '@/db/mysql';
import type { NextApiRequest, NextApiResponse } from 'next'
 
type PhysicalData = {
  id: number;
  Fitness: number;
  Impact: number;
}

type ErrorResponse = {
    error: string;
  };
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhysicalData[] | ErrorResponse> 
) {
    if (req.method === 'GET') {
        try{
            const [rows] = await pool.query("SELECT * FROM fitness")
            const data = rows as PhysicalData[]
            res.status(200).json(data);
        } 
        catch (error) {console.error(error)}
    }
    else {
        res.status(405).json({ error: 'Method not allowed' });
      }
}