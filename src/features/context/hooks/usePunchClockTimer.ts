/**
 * @file Provides a hook to manage the timer for an employee. This timer is used to keep track of the time since the last check-in.
 * @module ClockOperation
 * @author Torjus A.M
 */
import {useState, useEffect} from 'react';
import Employee from '../../../utils/employee';
import moment from 'moment';

/**
 * Hook to manage the timer for an employee.
 *
 * @param {Employee} employee - The employee object.
 * @returns {Object} An object containing:
 *   - timer: Current timer value.
 *   - setTimer: Setter function for the timer.
 *   - timerLimit: Boolean indicating if the timer limit has been reached.
 *   - setTimerLimit: Function to set the timer limit.
 *   - isTimerLoading: Boolean indicating if the timer data is loading.
 */
export const usePunchClockTimer = (employee: Employee) => {
    const [timer, setTimer] = useState(0);
    const [isTimerLoading, setIsTimerLoading] = useState(false);
    const [timerLimit, setTimerLimit] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (employee && employee.isClockedIn) {
            setIsTimerLoading(true);
            interval = setInterval(() => {
                // Calculate time difference between now and the last check-in time in seconds
                const timeDifference = moment().diff(moment(employee.lastCheckIn), 'seconds');
                setTimer(timeDifference);
                setIsTimerLoading(false);

                /* If the timer exceeds 15 hours, send signal to clock the employee out.
                15 hours is a placeholder value for the limit, this would have to include
                logic from vismas system in order to variate the limit depending on the employee's work hours. */
                setTimerLimit(timeDifference >= 54000);

                // Interval runs every second
            }, 1000);
        }

        // Cleanup function to clear the interval when the component unmounts, or before the effect runs again
        return () => {
            setIsTimerLoading(true)
            if (interval) clearInterval(interval);
            setIsTimerLoading(false);
        };
    }, [employee]);

    return {
        timer,
        setTimer,
        timerLimit,
        setTimerLimit,
        isTimerLoading,
        setIsTimerLoading
    };
};