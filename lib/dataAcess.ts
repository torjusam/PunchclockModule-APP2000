//Author: Torjus A.M
import {Employee } from './definitions';
import { updateEmployeeStatus } from './employeeStorage';

//fetches all employees, and stores in an array of type Employee
export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch('/api/getEmployees');
    if (response.ok) {
      const result = await response.json();
      return result.map((row: any) => {
        return {
          id: row.id,
          first_name: row.first_name,
          surname: row.surname,
        };
      });
    } else {
      console.error('Error:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
}
//fetches and formats employees with upcoming shifts
export async function fetchEmployeesWithSetShiftsData(): Promise<Employee[]> {
  try {
    const response = await fetch('/api/getEsWithSetShifts');
    if (response.ok) {
      const result = await response.json();
      return result.map((row: any) => {
        return {
          id: row.id,
          first_name: row.first_name,
          surname: row.surname,
          shiftStart: new Date(row.start),
          shiftEnd: new Date(row.end),
        };
      });
    } else {
      console.error('Error:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
}

export async function performCheckIn(employeeId_param: number): Promise<void> {
  try {
    const response = await fetch('/api/checkIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId_param }),
    });
    if (response.ok) {
      //sets clockedIn to true
      updateEmployeeStatus(employeeId_param, true);
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error('Error calling setCheckIn API:', error);
  }
}

export async function performCheckOut(employeeId_param: number): Promise<void> {
  try {
    const response = await fetch('/api/checkOut', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId_param }),
    });
    if (response.ok) {
      //sets clockedIn to false
      updateEmployeeStatus(employeeId_param, false);
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error('Error calling setCheckIn API:', error);
  }
}