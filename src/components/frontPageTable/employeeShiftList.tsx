// Author: Torjus A.M, Thomas H
import React, { useEffect, useState, useRef } from 'react';
import { Employee } from '../../lib/employee';
import EmployeeListDisplay from './employeeTable';
import { useEmployeeContext } from '../employeeContext';
import ButtonsBelowTable from '../Buttons/buttonsBelowTable';
import useOnClickOutside from '../../lib/clickOutside';
import { useRouter } from 'next/router';

const EmployeeShiftList: React.FC = () => {
  // Use custom hook for state context
  const { employees, setEmployees, clockedInEmployees, setClockedInEmployees } = useEmployeeContext()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedEmployee) {
      // Fetch the latest data for the selected employee
      const fetchSelectedEmployee = async () => {
        const updatedEmployee = employees.find((employee) => employee.id === selectedEmployee.id);
        setSelectedEmployee(updatedEmployee || null);
      };
      fetchSelectedEmployee();
    }
  }, [selectedEmployee]);

  const handleSelectedEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    router.push(`/${employee.id}`);
  };

  //When clicking outside of the list, the selected employee is set to null.
  const listRef = useRef(null);
  useOnClickOutside(listRef, () => setSelectedEmployee(null));

  return (
    <div ref={listRef}>
      {employees.length > 0 ? (
          <EmployeeListDisplay
            employeeShiftInfo={employees}
            onSelectEmployee={handleSelectedEmployee}
            selectedEmployee={selectedEmployee}
          />
      ) : null}
    </div>
  );
}

export default EmployeeShiftList;