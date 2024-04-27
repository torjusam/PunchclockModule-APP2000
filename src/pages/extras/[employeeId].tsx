/**
 * @file Used to set a dynamic url (employee's id), wrap the context, and display the page content
 * @module Extra
 * @author Torjus A.M, Magnus A, Ask I.P.A
 */
import React, {FC} from "react";
import ExtraPageData from "../../extra-Magnus_Ask";
import SelectedEmployeeProvider from "../../features/context/selectedEmployeeContext";
import {useEmployeePageData} from "../../hooks/useEmployeePageData";

const ExtraPage: FC = () => {
    const employee = useEmployeePageData();

    return (
        <SelectedEmployeeProvider employee={employee}>
            <ExtraPageData employee={employee}/>
        </SelectedEmployeeProvider>
    );
};

export default ExtraPage;