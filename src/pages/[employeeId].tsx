//Author: Torjus A.M
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PersonalPageData from '../components/employeeTerminal/personalPageData';
import { Employee } from '../lib/employee';
import { useEmployeeContext } from '../components/employeeContext';
import NavContainer from '../components/Navs/navContainer';
import styles from '../styles/flexContainers.module.css'

const EmployeePage: React.FC = () => {
  const { employees, setEmployees } = useEmployeeContext()
  const router = useRouter();
  const { employeeId } = router.query;
  const [employeeData, setEmployeeData] = useState<Employee | undefined>();

  useEffect(() => {
    if (employeeId) {
      const foundEmployee = employees.find((employee) => employee.id === Number(employeeId));
      setEmployeeData(foundEmployee);
    }
  }, [employeeId, employees]);

  if (!employeeData) {
    return <p style={{ color: 'white' }}>Loading...</p>;
  }

  return (
    <div className={styles.generalContainer}>
      <NavContainer />
      <PersonalPageData employee={employeeData} />
    </div>
  );
}

export default EmployeePage;
