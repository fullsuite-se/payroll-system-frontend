import { useEffect, useState, useCallback } from "react";
import { useCompanyContext } from "../contexts/CompanyProvider";
import { useToastContext } from "../contexts/ToastProvider";
import { addOneHoliday, deleteOneHoliday, fetchHolidays } from "../services/holiday.service";
import { convertToISO8601 } from "../utility/datetime.utility";

const initialFormData = {
    holiday_date: '',
    holiday_name: '',
    holiday_type: 'REGULAR',
    holiday_rate: '',
};

const useHoliday = () => {
    const [holidays, setHolidays] = useState([]);
    const [selectedHoliday, setSelectedHoliday] = useState(null);
    const [holidaysLoading, setHolidaysLoading] = useState(false);
    const [showAddHoliday, setShowAddHoliday] = useState(false);
    const [holidayFormData, setHolidayFormData] = useState(initialFormData);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);

    const { company } = useCompanyContext();
    const { addToast } = useToastContext();

    const handleFetchHolidays = useCallback(async () => {
        if (!company?.company_id) return;

        setHolidaysLoading(true);
        try {
            const result = await fetchHolidays(company.company_id);
            setHolidays(result.data.holidays || []);
        } catch (error) {
            console.error('Failed to fetch holidays:', error);
            addToast("Failed to fetch holidays", "error");
        } finally {
            setHolidaysLoading(false);
        }
    }, [company, addToast]);

    useEffect(() => {
        handleFetchHolidays();
    }, [handleFetchHolidays]);

    const handleChangeSelectedHoliday = (holiday) => {
        setSelectedHoliday(holiday);
    };

    const handleShowAddHolidayModal = () => {
        setShowAddHoliday(prev => !prev);
        // Reset form when closing modal
        if (showAddHoliday) {
            setHolidayFormData(initialFormData);
        }
    };

    const handleFormChange = (field, value) => {
        setHolidayFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddHoliday = async () => {
        setAddLoading(true);
        try {
            const payload = {
                ...holidayFormData,
                holiday_date: convertToISO8601(holidayFormData.holiday_date),
                holiday_rate: Number(holidayFormData.holiday_rate),
            };

            await addOneHoliday(company.company_id, payload);
            addToast("Holiday added successfully", "success");
            setHolidayFormData(initialFormData);
            setShowAddHoliday(false);
            await handleFetchHolidays();
        } catch (error) {
            console.error('Failed to add holiday:', error);
            addToast(error.response?.data?.message || "Failed to add holiday", "error");
        } finally {
            setAddLoading(false);
        }
    };

    const handleDeleteHoliday = async (company_holiday_id) => {
        setDeleteLoading(company_holiday_id);
        try {
            await deleteOneHoliday(company.company_id, company_holiday_id);
            addToast("Holiday deleted successfully", "success");
            await handleFetchHolidays();
            // Clear selection if deleted holiday was selected
            if (selectedHoliday?.company_holiday_id === company_holiday_id) {
                setSelectedHoliday(null);
            }
        } catch (error) {
            console.error('Failed to delete holiday:', error);
            addToast(error.response?.data?.message || "Failed to delete holiday", "error");
        } finally {
            setDeleteLoading(null);
        }
    };

    return {
        holidays,
        selectedHoliday,
        holidaysLoading,
        showAddHoliday,
        holidayFormData,
        addLoading,
        deleteLoading,
        handleChangeSelectedHoliday,
        handleShowAddHolidayModal,
        handleAddHoliday,
        handleFormChange,
        handleDeleteHoliday,
        handleFetchHolidays,
    };
};

export default useHoliday;