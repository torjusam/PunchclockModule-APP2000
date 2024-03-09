/* 
    Author: Torjus A.M
    This component is used to display the last check time of an employee
    along with an icon indicating the action (checked in / out).
    The component is used on the frontpage table aswell as on the employee page.
*/
import React, { useState, useEffect } from 'react';
import { Employee } from '../../lib/employee';
import { formatTime } from '../../lib/dateFormatter';
import ArrowIn from '../../lib/assets/svg/arrowIn.svg'
import ArrowOut from '../../lib/assets/svg/arrowOut.svg';
import styles from './employeeList.module.css';

const LastCheckTime: React.FC<{ employee: Employee }> = ({ employee }) => {
    // Two states are defined, one for the formatted time and one for the last action (in/out).
    const [lastCheckTime, setLastCheckTime] = useState('');
    const [lastAction, setLastAction] = useState('');

    useEffect(() => {
        // Sets last action to in or out based on if employee is clocked in or not.
        if (employee.isClockedIn) {
            setLastCheckTime(formatTime(employee.lastCheckIn))
            setLastAction('in');
        } else {
            setLastCheckTime(formatTime(employee.lastCheckOut))
            setLastAction('out');
        }

    }, [employee.lastCheckIn, employee.lastCheckOut]);
    
    // The arrow is set based on the last action of the employee.
    const Arrow = lastAction === 'in' ? ArrowIn : ArrowOut;
    return (
        <div className={styles.lastCheckContainer}>
            <Arrow className={styles.icon} />
            <div className={styles.lastCheckTime}>
                {lastCheckTime}
            </div>
        </div>
    );
}

export default LastCheckTime;