/**
 * @file Function for performing a clock-in operation.
 * @module ClockOperation
 * @Author Thomas H
 * @editor Ask I.P.A
 */
import {Employee} from "../../../../lib/types/employee";

/**
 * Performs a clock-in operation for an employee.
 *
 * @param {Employee} employee - The employee who is clocking in.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the operation was successful.
 * @throws {TypeError} - Throws a TypeError if the employee is already clocked in.
 * @throws {Error} - Throws an Error if the response from the server is not ok.
 */
export const clockIn = async (employee: Employee, date, clockIn, clockOut) => {
    if (employee.isClockedIn)
        return Promise.reject(new TypeError(employee.name + ' er ikke utstemplet!'));
    try {
        const response = await fetch('/api/clockOperation/clockIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employee, date, clockIn, clockOut}),
        });
        if (!response.ok) {
            throw new Error('Feil ved utstempling!');
        }
        return true; // Tell the caller that the operation was successful.
    } catch (error) {
        console.error('Error performing check operation:', error);
        throw error;
    }
};