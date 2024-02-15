//Author: Torjus A.M
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EmployeeList } from '../lib/employeeStorage';
import GoToIndexButton from '../components/redirectToIndexButton';
import EmployeeForm from '../components/employeeForm';
import { Employee } from '../lib/definitions';
import Square from '../components/employeeTerminal/square';

const EmployeePage: React.FC = () => {
  const router = useRouter();
  const { employeeId } = router.query;
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);


  useEffect(() => {
    if (employeeId) {
      const employeeData = EmployeeList.getEmployeeById(Number(employeeId));
  
      // check if the employeeData is defined before setting the state
      if (employeeData) {
        setEmployee(employeeData);
      }
    }
  }, [employeeId]);

  if (!employee) {
    return <p style={{color:'white'}}>Loading...</p>;
  }

  return (
    <div>
      <GoToIndexButton />
      <Square />
    </div>
  );
}

export default EmployeePage;
