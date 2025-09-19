import payroll_api from "../configs/payroll_api.config";

export const getRecurringPays = async (company_id) => {
    return await payroll_api.get(`/api/v1/employees/companies/${company_id}/recurring-pays`)
};

export const addOneRecurringPay = async (company_id, formData) => {
    return await payroll_api.post(`/api/v1/employees/companies/${company_id}/recurring-pays`, formData);
};

export const updateOneRecurringPay = async (recurring_pay_id, formData) => {
    return await payroll_api.patch(`/api/v1/employees/recurring-pays/${recurring_pay_id}`, formData);
};

export const deleteOneRecurringPay = async (recurring_pay_id) => {
    return await payroll_api.delete(`/api/v1/employees/recurring-pays/${recurring_pay_id}`);
};

