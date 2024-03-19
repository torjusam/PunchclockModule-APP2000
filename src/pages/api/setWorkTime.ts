// Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { employeeId,  } = req.body;

        const text = (`
        UPDATE employee
            SET fleksitid_balance = $1,
            SET balance = $2,
            WHERE Employee_id = $3;
        `);
        const values = [employeeId,];

        await pool.query(text, values);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error inserting check-out data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
