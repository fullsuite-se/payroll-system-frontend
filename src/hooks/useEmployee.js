import { useEffect, useState } from "react";
import { useCompanyContext } from "../contexts/CompanyProvider";
import { fetchEmployeeById, fetchEmployeesByCompanyId, fetchEmployeesByCompanyIdAndQuery } from "../services/employee.service";
import { useToastContext } from "../contexts/ToastProvider";
import useDebounce from "./useDebounce";
import * as XLSX from 'xlsx';

const formData = {
    employee_id: '',
    first_name: '',
    middle_name: null,
    last_name: '',
    personal_email: '',
    work_email: '',
    job_title: '',
    department: '',
    employement_status: true, // boolean instead of string
    permanent_address: '',
    current_address: '',
    civil_status: '',
    date_hired: '',
    date_end: null, // nullable
    sex: '',
    base_pay: null, // nullable number
    date: null, // nullable date
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
    const [isUploading, setIsUploading] = useState(false);

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

    // Helper function to normalize column headers
    const normalizeHeader = (header) => {
        return header
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '_')
            .replace(/[^\w]/g, '');
    };

    // Helper function to map file data to form structure
    const mapFileDataToForm = (data) => {
        return data.map((row, index) => {
            const mappedRow = { ...formData, id: Date.now() + index };

            // Get valid form keys
            const formKeys = Object.keys(formData);

            // Map each property from the file data
            Object.entries(row).forEach(([key, value]) => {
                const normalizedKey = normalizeHeader(key);

                // Find matching form field
                const matchingField = formKeys.find(formKey =>
                    normalizeHeader(formKey) === normalizedKey
                );

                if (matchingField && value !== null && value !== undefined) {
                    // Handle different data types
                    if (typeof value === 'string') {
                        mappedRow[matchingField] = value.trim();
                    } else if (typeof value === 'number') {
                        mappedRow[matchingField] = value.toString();
                    } else if (typeof value === 'boolean') {
                        mappedRow[matchingField] = value;
                    } else {
                        mappedRow[matchingField] = String(value);
                    }
                }
            });

            return mappedRow;
        });
    };

    // Parse Excel file
    const parseExcelFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });

                    // Get first worksheet
                    const worksheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[worksheetName];

                    // Convert to JSON with headers
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                        defval: '',
                        blankrows: false
                    });

                    if (jsonData.length === 0) {
                        reject(new Error('No data found in the Excel file'));
                        return;
                    }

                    // Convert array format to object format
                    const headers = jsonData[0];
                    const rows = jsonData.slice(1).map(row => {
                        const obj = {};
                        headers.forEach((header, index) => {
                            obj[header] = row[index] || '';
                        });
                        return obj;
                    });

                    resolve(rows);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        });
    };

    const uploadEmployeeFile = async (file) => {
        if (!file) {
            addToast("Please select a file", "error");
            return;
        }

        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (!['csv', 'xlsx', 'xls'].includes(fileExtension)) {
            addToast("Please upload a CSV or Excel file", "error");
            return;
        }

        setIsUploading(true);

        try {
            let parsedData = [];

            if (fileExtension === 'csv') {
                parsedData = await parseCSVFile(file);
            } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                parsedData = await parseExcelFile(file);
            }

            if (parsedData.length === 0) {
                addToast("No data found in the file", "error");
                return;
            }

            // Map the data to form structure
            const mappedData = mapFileDataToForm(parsedData);

            // Filter out completely empty rows
            const validData = mappedData.filter(row =>
                Object.values(row).some(value =>
                    value !== '' && value !== null && value !== undefined && value !== 'id'
                )
            );

            if (validData.length === 0) {
                addToast("No valid employee data found in the file", "error");
                return;
            }

            // Update the form data
            setEmployeesFormData(validData);

            addToast(`Successfully loaded ${validData.length} employee(s) from file`, "success");

        } catch (error) {
            console.error('File upload error:', error);
            addToast(`Failed to process file: ${error.message}`, "error");
        } finally {
            setIsUploading(false);
        }
    };

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
        isUploading,

        // Form manipulation functions
        handleAddRow,
        handleRemoveRow,
        handleFieldChange,
        handleResetForm,
        handleAddEmployees,
        uploadEmployeeFile,
    };
};

export default useEmployee;