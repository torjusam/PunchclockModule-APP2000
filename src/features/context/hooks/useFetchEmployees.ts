/*
    Author: Torjus A.M, Thomas H
    This hook encapsulates the logic for fetching employee data from an API,
    managing related state, and sending errors.
*/
import {useEffect, useState} from 'react';
import {Employee} from '../../../lib/types/employee';
import {ResError} from "../../../lib/types/types";
import {useSession} from "next-auth/react";

export default function useFetchEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [error, setError] = useState<ResError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    // Session data from next-auth
    const {data: session} = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getEmployees');
                if (response.ok) {
                    const result = await response.json();
                    const employeeList = result.map((row: any) => {
                        return new Employee(
                            row.id,
                            row.name,
                            row.plannedwork,
                            row.pin,
                            row.profilepictureurl,
                            row.lastcheckin,
                            row.lastcheckout
                        );
                    });
                    setEmployees(employeeList);
                } else {
                    throw {status: response.status, message: response.statusText};
                }
            } catch (error) {
                setError({status: error.status, message: error.message});
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        // Hook re-runs on session change (login/logout)
    }, [session]);

    // Returns an object containing the employees, error, loading, and setEmployees states.
    return {
        employees,
        error,
        loading,
        setEmployees
    };
}