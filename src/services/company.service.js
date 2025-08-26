import payroll_api from "../configs/payroll_api.config";


export const getCompaniesService = async () => {
    return await payroll_api.get("/api/v1/companies/access/me");
};

export const createCompany = async (formData) => {
    return await payroll_api.post("/api/v1/companies", formData);
};

export const createUserToManageCompany = async (user_ids, company_id) => {
    return await payroll_api.post(`/api/v1/companies/${company_id}/access`, { user_ids });
}