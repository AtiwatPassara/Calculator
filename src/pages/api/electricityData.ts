import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../db/mysql'; 

type Electricity = {
    id : number,
    country: string,
    electricity: number
}

type ErrorResponse = {
    error : string
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Electricity[] | ErrorResponse>) {
  if (req.method === 'GET') {
    try{
        const [rows] = await pool.query('SELECT * FROM electricity');
        const data = rows as Electricity[]
        res.status(200).json(data);
    }
    catch{
        res.status(500).json({ error: 'Error fetching data' });
    }
  } 
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}