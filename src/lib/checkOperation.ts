/* 
    Author: Torjus A.M
    Various functions for performing check operations on employees.
*/
const updateEmployeeStatus = (employees, employee) => {
  return employees.map(emp => {
      if (emp.id !== employee.id) {
          return emp;
      }
      return {
          ...emp,
          isClockedIn: !employee.isClockedIn,
          lastCheckIn: employee.isClockedIn ? emp.lastCheckIn : new Date(),
          lastCheckOut: employee.isClockedIn ? new Date() : emp.lastCheckOut,
      };
  });
};

const performCheckOperation = async (employee, currentTime) => {
  const endpoint = employee.isClockedIn ? '/api/checkOut' : '/api/checkIn';
  const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employee, currentTime}),
  });

  if (!response.ok) {
      throw new Error('Failed to perform check operation');
  }
};

export const checkOperation = async (employee, employees, setEmployees) => {
  try {
      if (employee) {
        const currentTime = new Date();
          await performCheckOperation(employee, currentTime);
          const updatedEmployees = updateEmployeeStatus(employees, employee);
          setEmployees(updatedEmployees);
      } else {
          throw new Error('Employee not found');
      }
  } catch (error) {
      console.error('Error performing check operation:', error);
      throw error;
  }
};