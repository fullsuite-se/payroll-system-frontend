import { useEffect, useState } from "react";
import { useEmployeeContext } from "../contexts/EmployeeProvider";
import { useCompanyContext } from "../contexts/CompanyProvider";
import { useToastContext } from "../contexts/ToastProvider";
import { addOneAttendance, deleteAttendance, fetchAttendances } from "../services/attendance.service";
import * as XLSX from 'xlsx';
import { formatDateTime, formatDateToISO18601, normalizeHeader, parseExcelDateTime, parseExcelFile } from "../utility/upload.utility";
import useDebounce from "./useDebounce";

const formData = {
    employee_id: '',
    attendance_date: '',
    time_in: '',
    time_out: '',
    hours_rendered: '',
    hours_worked: '',
    hours_logged: '',
    undertime: '',
    tardiness: '',
    night_differential: '',
    shift_type: 'REGULAR',
};

const filterFields = {
    employee_id: '',
    from: '',
    to: '',
}

const useAttendance = () => {
    const [attendances, setAttendances] = useState([]);
    const [attendance, setAttendance] = useState();
    const [isAttendancesLoading, setIsAttendancesLoading] = useState(false);
    const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isAddAttendanceLoading, setIsAddAttendanceLoading] = useState(false);
    const [filters, setFilters] = useState({ ...filterFields });
    const [attendanceFormData, setAttendanceFormData] = useState([{
        id: Date.now(), ...formData
    }]);

    const { employee } = useEmployeeContext();
    const { company } = useCompanyContext();
    const { addToast } = useToastContext();

    const debouncedQuery_employee_id = useDebounce(filters.employee_id, 800);
    const debouncedQuery_to = useDebounce(filters.to, 800);
    const debouncedQuery_from = useDebounce(filters.from, 800);

    const handleFetchAttendances = async () => {
        setIsAttendancesLoading(true);

        try {
            // Always call fetchAttendances with all parameters
            // The service will handle which ones to include in the query
            const result = await fetchAttendances(
                company.company_id,
                debouncedQuery_employee_id || null,
                debouncedQuery_from || null,
                debouncedQuery_to || null
            );

            setAttendances(result.data.attendances);
        } catch (error) {
            console.error(error);
            addToast("Failed to fetch attendances", "error");
        } finally {
            setIsAttendancesLoading(false);
        }
    };

    useEffect(() => {
        if (!company) return;

        handleFetchAttendances();
    }, [company, debouncedQuery_employee_id, debouncedQuery_to, debouncedQuery_from]);

    const handleRowClick = (data, row) => {
        console.log('clicked: ', data);
    };

    const handleShowAttendanceModal = () => {
        setShowAttendanceModal(!showAttendanceModal);
    }

    // Helper function to map file data to form structure
    const mapFileDataToForm = (data) => {
        const validShiftTypes = ['REGULAR', 'SLIDE'];

        return data.map((row, index) => {
            const mappedRow = { ...formData, id: Date.now() + index };

            // Get valid form keys
            const formKeys = Object.keys(formData);

            Object.entries(row).forEach(([key, value]) => {
                const normalizedKey = normalizeHeader(key);

                // Find matching form field
                const matchingField = formKeys.find(
                    (formKey) => normalizeHeader(formKey) === normalizedKey
                );

                if (matchingField && value !== null && value !== undefined && value !== "") {
                    // Handle employee_id (string)
                    if (matchingField === "employee_id") {
                        mappedRow[matchingField] = String(value).trim();
                    }
                    // Handle attendance_date (date field - YYYY-MM-DD)
                    else if (matchingField === "attendance_date") {
                        const parsedDate = parseExcelDateTime(value);
                        mappedRow[matchingField] = formatDateToISO18601(parsedDate);
                    }
                    // Handle time_in and time_out (datetime fields - YYYY-MM-DD HH:MM:SS)
                    else if (["time_in", "time_out"].includes(matchingField)) {
                        const parsedDateTime = parseExcelDateTime(value);
                        mappedRow[matchingField] = formatDateTime(parsedDateTime);
                    }
                    // Handle decimal/number fields
                    else if ([
                        "hours_rendered",
                        "hours_worked",
                        "hours_logged",
                        "undertime",
                        "tardiness",
                        "night_differential"
                    ].includes(matchingField)) {
                        const numValue = Number(value);
                        mappedRow[matchingField] = isNaN(numValue) ? '' : numValue.toString();
                    }
                    // Handle shift_type enum
                    else if (matchingField === "shift_type") {
                        const shiftValue = String(value).toUpperCase().trim();
                        mappedRow[matchingField] = validShiftTypes.includes(shiftValue) ? shiftValue : 'REGULAR';
                    }
                    // Everything else (fallback to string)
                    else {
                        mappedRow[matchingField] = String(value).trim();
                    }
                }
            });

            return mappedRow;
        });
    };

    const uploadAttendanceFile = async (file) => {
        if (!file) {
            addToast("Please select a file", "error");
            return;
        };

        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (!['csv', 'xlsx', 'xls'].includes(fileExtension)) {
            addToast("Please upload a CSV or Excel file", "error");
            return;
        }

        setIsUploading(true);

        try {
            let parsedData = [];

            if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                parsedData = await parseExcelFile(file);
            }

            if (parsedData.length === 0) {
                addToast("No data found in the file", "error");
                return;
            }

            // Map the data to form structure
            const mappedData = mapFileDataToForm(parsedData);

            // Filter out rows without required fields (employee_id and attendance_date)
            const validData = mappedData.filter(row =>
                row.employee_id && row.employee_id.trim() &&
                row.attendance_date
            );

            if (validData.length === 0) {
                addToast("No valid attendance data found in the file. Make sure employee_id and attendance_date are provided.", "error");
                return;
            }

            // Update the form data
            setAttendanceFormData(validData);

            addToast(`Successfully loaded ${validData.length} attendance record(s) from file`, "success");

        } catch (error) {
            console.error('File upload error:', error);
            addToast(`Failed to process file: ${error.message}`, "error");
        } finally {
            setIsUploading(false);
        }
    };

    const handleAddRow = () => {
        const newRow = { ...formData, id: Date.now() };
        setAttendanceFormData(prev => [...prev, newRow]);
    }

    const handleRemoveRow = (id) => {
        if (attendanceFormData.length > 1) {
            setAttendanceFormData(prev => prev.filter(row => row.id !== id));
        }
    };

    const handleFieldChange = (id, field, value) => {
        setAttendanceFormData(prev =>
            prev.map(row =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const handleResetForm = () => {
        setAttendanceFormData([{ ...formData, id: Date.now() }]);
    };

    const handleAddAttendances = async () => {
        setIsAddAttendanceLoading(true);
        try {
            // Validate form data - require employee_id and attendance_date
            const validAttendances = attendanceFormData.filter(att =>
                att.employee_id && att.employee_id.trim() && att.attendance_date
            );

            if (validAttendances.length === 0) {
                addToast("Please provide employee_id and attendance_date for each attendance record", "error");
                return;
            }

            const failedAttendances = [];

            for (const att of validAttendances) {
                try {
                    // Clean up and format the data before sending
                    const cleanedAtt = { ...att };
                    delete cleanedAtt.id; // Remove the UI-only id field

                    // Convert string numbers to actual numbers for backend
                    const numberFields = [
                        'hours_rendered',
                        'hours_worked',
                        'hours_logged',
                        'undertime',
                        'tardiness',
                        'night_differential'
                    ];

                    numberFields.forEach(field => {
                        if (cleanedAtt[field] !== '' && cleanedAtt[field] !== null && cleanedAtt[field] !== undefined) {
                            const numValue = Number(cleanedAtt[field]);
                            cleanedAtt[field] = isNaN(numValue) ? null : numValue;
                        } else {
                            cleanedAtt[field] = null;
                        }
                    });

                    // Handle empty datetime fields
                    if (!cleanedAtt.time_in || cleanedAtt.time_in === '') {
                        cleanedAtt.time_in = null;
                    }
                    if (!cleanedAtt.time_out || cleanedAtt.time_out === '') {
                        cleanedAtt.time_out = null;
                    }

                    await addOneAttendance(company.company_id, cleanedAtt);
                    addToast(`Successfully added attendance for employee: ${att.employee_id}`, "success");
                } catch (error) {
                    console.error('Error adding attendance:', error);
                    addToast(`Error adding attendance for employee: ${att.employee_id}`, "error");
                    failedAttendances.push(att);
                }
            }

            // Update the form with only failed attendances
            if (failedAttendances.length > 0) {
                setAttendanceFormData(failedAttendances);
                await handleFetchAttendances(); // Refresh the list to show successful additions
            } else {
                // Reset form if all succeeded
                handleResetForm();
                await handleFetchAttendances(); // Refresh the list
                //close modal
                handleShowAttendanceModal();
            }

        } catch (error) {
            console.error('Error adding attendances:', error);
            addToast("Failed to add attendances", "error");
        }
        finally {
            setIsAddAttendanceLoading(false);
        }
    };

    const handleDeleteOneAttendance = async (rowData) => {
        console.log('attendance id: ', rowData.employee_attendance_id);

        try {
            await deleteAttendance(company.company_id, rowData.employee_attendance_id);
            addToast("Records successfully deleted", "success");
            //trigger reload of attendances
            await handleFetchAttendances();
        } catch (error) {
            console.log(error);
            addToast("Failed to delete record", "error");
        }
    }

    //reset filter
    const handleResetFilter = () => {
        setFilters({ ...filterFields });
    };

    //handleChange filter
    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return {
        attendances, setAttendances,
        attendance, setAttendance,
        isAttendancesLoading, setIsAttendancesLoading,
        isAttendanceLoading, setIsAttendanceLoading,
        handleRowClick,
        showAttendanceModal, setShowAttendanceModal,
        handleShowAttendanceModal,
        isUploading, setIsUploading,
        uploadAttendanceFile,

        //form manipulation
        attendanceFormData,
        handleAddRow, handleRemoveRow, handleFieldChange, handleResetForm,
        isAddAttendanceLoading, setIsAddAttendanceLoading,

        //form adding
        handleAddAttendances,

        //delete 
        handleDeleteOneAttendance,

        //filter
        filters, setFilters,
        handleResetFilter, handleFilterChange,
    };
};

export default useAttendance;