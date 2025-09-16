import { createContext, useContext } from "react";
import useEmployee from "../hooks/useEmployee";

//context
const EmployeeContext = createContext();

//provider
export const EmployeeProvider = ({ children }) => {
    const employee = useEmployee();

    //wait for employee to load
    //TODO :  add a wait here
    // if (employee.isEmployeesLoading) return null;

    return (
        <EmployeeContext.Provider value={{ ...employee }} >
            {children}
        </EmployeeContext.Provider>
    )
}

//hooks/consumer
export const useEmployeeContext = () => useContext(EmployeeContext);