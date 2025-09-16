import payroll_api from "../configs/payroll_api.config";

export const fetchHolidays = async (company_id, employee_id = null, from = null, to = null) => {
    let query = '';
    if (employee_id) {
        query = `${query}&employee_id=${employee_id}`;
    }
    if (from) {
        query = `${query}&from=${from}`;
    }
    if (to) {
        query = `${query}&to=${to}`;
    }

    return await payroll_api.get(`/api/v1/daily-records/companies/${company_id}/holidays?${query}`);
};

export const addOneHoliday = async (company_id, formData) => {
    return await payroll_api.post(`/api/v1/daily-records/companies/${company_id}/holidays`, formData);
}

export const updateOneHoliday = async (company_id, company_holiday_id, formData) => {
    return await payroll_api.patch(`/api/v1/daily-records/companies/${company_id}/holidays/${company_holiday_id}`, formData);
}

export const deleteOneHoliday = async (company_id, company_holiday_id) => {
    return await payroll_api.delete(`/api/v1/daily-records/companies/${company_id}/holidays/${company_holiday_id}`);
}