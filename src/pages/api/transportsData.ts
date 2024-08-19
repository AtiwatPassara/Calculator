import pool from '@/db/mysql';
import type { NextApiRequest, NextApiResponse } from 'next'

type transportsData = {
    id: number;
    mode: string;
    impact: number;
}

type ErrorResponse = {
    error: string;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<transportsData[] | ErrorResponse>) {
  if (req.method === 'GET') {
    try{
        const [rows] = await pool.query("SELECT * FROM transports")
        const data = rows as transportsData[];
        res.status(200).json(data)}
        catch(error){
            console.error(error)
        }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}