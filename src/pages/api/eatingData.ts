import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../db/mysql'; 

type EatingHabit = {
  id: number;
  Region: string;
  Habit: string;
  Impact: number;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EatingHabit[] | ErrorResponse>
) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM eating');
      const data = rows as EatingHabit[];
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
