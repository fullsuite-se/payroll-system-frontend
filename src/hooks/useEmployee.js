import { useEffect, useState } from "react";
import { useCompanyContext } from "../contexts/CompanyProvider";
import { fetchEmployeeById, fetchEmployeesByCompanyId, fetchEmployeesByCompanyIdAndQuery } from "../services/employee.service";
import { useToastContext } from "../contexts/ToastProvider";
import useDebounce from "./useDebounce";



const useEmployee = () => {
    const { company } = useCompanyContext();
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState();
    const [isEmployeesLoading, setIsEmployeesLoading] = useState(false);
    const [isEmployeeLoading, setIsEmployeeLoading] = useState();
    const [query, setQuery] = useState("");

    const { addToast } = useToastContext();
    const debouncedQuery = useDebounce(query, 800);

    useEffect(() => {
        let ignore = false;

        const fetchEmployees = async () => {
            if (!employees.length) setIsEmployeesLoading(true); // only show loader if no data yet
            try {
                let result;
                if (debouncedQuery && debouncedQuery.trim() !== "") {
                    result = await fetchEmployeesByCompanyIdAndQuery(company.company_id, debouncedQuery);
                } else {
                    result = await fetchEmployeesByCompanyId(company.company_id);
                }

                if (!ignore) setEmployees(result.data.employees);
            } catch (error) {
                console.error(error);
                addToast("Failed to fetch employees", "error");
            } finally {
                if (!ignore) setIsEmployeesLoading(false);
            }
        };

        if (company) fetchEmployees();
        return () => { ignore = true };
    }, [company, debouncedQuery]);


    const handleFetchEmployeeInfo = async (employee_id) => {
        setIsEmployeeLoading(true);
        try {
            const result = await fetchEmployeeById(employee_id);
            setEmployee(result.data.employee);
            console.log('fetched employee info: ', result);

        } catch (error) {
            console.log('error', error);
            addToast("Failed to fetch employee information", error);
        }
        finally {
            setIsEmployeeLoading(false);
        }
    }


    return {
        employees, setEmployees,
        employee, setEmployee,
        isEmployeesLoading, setIsEmployeesLoading,
        isEmployeeLoading, setIsEmployeeLoading,
        handleFetchEmployeeInfo,
        query, setQuery,

    }
};

export default useEmployee;