import payroll_api from "../configs/payroll_api.config";

export const fetchPayitems = async () => {
    return await payroll_api.get(`/api/v1/payitems`);
};