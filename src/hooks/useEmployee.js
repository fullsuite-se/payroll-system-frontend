import { useEffect, useState } from "react";
import { useCompanyContext } from "../contexts/CompanyProvider";
import { fetchEmployeeById, fetchEmployeesByCompanyId, fetchEmployeesByCompanyIdAndQuery } from "../services/employee.service";
import { useToastContext } from "../contexts/ToastProvider";
import useDebounce from "./useDebounce";

const formData = {
    employee_id: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    personal_email: '',
    work_email: '',
    job_title: '',
    department: '',
    employement_status: '',
    permanent_address: '',
    current_address: '',
    civil_status: '',
    date_hired: '',
    date_end: '',
    sex: '',
    base_pay: '',
    date: '',
    change_type: '',
    is_active: true,
};

const useEmployee = () => {
    const { company } = useCompanyContext();
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState();
    const [isEmployeesLoading, setIsEmployeesLoading] = useState(false);
    const [isEmployeeLoading, setIsEmployeeLoading] = useState();
    const [query, setQuery] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const { addToast } = useToastContext();
    const debouncedQuery = useDebounce(query, 800);

    // Fix: Use useState correctly for employeesFormData
    const [employeesFormData, setEmployeesFormData] = useState([
        { ...formData, id: Date.now() } // Add unique id for each row
    ]);

    useEffect(() => {
        let ignore = false;

        const fetchEmployees = async () => {
            if (!employees.length) setIsEmployeesLoading(true);
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
        } finally {
            setIsEmployeeLoading(false);
        }
    };

    const handleShowAddModal = (val) => {
        setShowAddModal(val);
    };

    // Form manipulation functions
    const handleAddRow = () => {
        const newRow = { ...formData, id: Date.now() };
        setEmployeesFormData(prev => [...prev, newRow]);
    };

    const handleRemoveRow = (id) => {
        if (employeesFormData.length > 1) {
            setEmployeesFormData(prev => prev.filter(row => row.id !== id));
        }
    };

    const handleFieldChange = (id, field, value) => {
        setEmployeesFormData(prev =>
            prev.map(row =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const handleResetForm = () => {
        setEmployeesFormData([{ ...formData, id: Date.now() }]);
    };

    const handleAddEmployees = async () => {
        try {
            // Validate form data
            const validEmployees = employeesFormData.filter(emp =>
                emp.first_name.trim() && emp.last_name.trim()
            );

            if (validEmployees.length === 0) {
                addToast("Please fill in at least first name and last name for each employee", "error");
                return;
            }

            // Logic for adding employees to the database
            console.log('Adding employees:', validEmployees);

            // After successful addition, reset form and close modal
            handleResetForm();
            handleShowAddModal(false);
            addToast(`Successfully added ${validEmployees.length} employee(s)`, "success");

        } catch (error) {
            console.error('Error adding employees:', error);
            addToast("Failed to add employees", "error");
        }
    };

    const uploadEmployeeFile = () => {

    }

    return {
        employees, setEmployees,
        employee, setEmployee,
        isEmployeesLoading, setIsEmployeesLoading,
        isEmployeeLoading, setIsEmployeeLoading,
        handleFetchEmployeeInfo,
        query, setQuery,
        handleShowAddModal,
        showAddModal, setShowAddModal,
        employeesFormData, setEmployeesFormData,

        // Form manipulation functions
        handleAddRow,
        handleRemoveRow,
        handleFieldChange,
        handleResetForm,
        handleAddEmployees,
    };


};

export default useEmployee;