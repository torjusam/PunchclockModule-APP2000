/**
 * @file Api route for clocking in an employee.
 * @module ClockOperation
 * @author Torjus A.M
 * @editor Ask I.P.A
 */
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {handler, Middleware} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";

const clockChange: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employee, date, oldClockIn, oldClockOut, newClockIn, newClockOut} = req.body;
        const {id} = employee;

        const text = 'UPDATE fleksitidBank SET Date = $1, Clockin = $2, Clockout = $3 WHERE Employee_id = $4';
        const values = [id, oldClockIn, oldClockOut, date,  newClockIn, newClockOut];

        await pool.query(text, values);
        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}

export default handler(
    allowMethods(['POST']), // Use the method middleware to allow only POST requests
    middleware_1,
    middleware_2,
    clockChange,
);

/* Avoid false-positive warning "API resolved without sending a response":
Code taken from forum post answer: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223 */
export const config = {
    api: {
        externalResolver: true,
    },
}