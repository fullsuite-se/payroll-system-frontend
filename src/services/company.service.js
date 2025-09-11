import payroll_api from "../configs/payroll_api.config";


export const getCompaniesService = async () => {
    return await payroll_api.get("/api/v1/companies/access/me");
};

export const getCompanyFullDetail = async (company_id) => {
    return await payroll_api.get(`/api/v1/companies/${company_id}`);
}

export const createCompany = async (formData) => {
    return await payroll_api.post("/api/v1/companies", formData);
};

export const createUserToManageCompany = async (user_ids, company_id) => {
    return await payroll_api.post(`/api/v1/companies/${company_id}/access`, { user_ids });
}

export const createCompanyPayrollFrequency = async (company_id, frequency) => {
    return await payroll_api.post(`/api/v1/companies/${company_id}/configuration/payroll-frequency`, { frequency })
};

export const createCompanyWorkingDays = async (company_id, number_of_days) => {
    return await payroll_api.post(`/api/v1/companies/${company_id}/configuration/working-days`, { number_of_days });
}

export const updateCompany = async (company_id, formData) => {
    return await payroll_api.patch(`/api/v1/companies/${company_id}`, formData);
};

export const updateCompanyInfo = async (company_id, formData) => {
    return await payroll_api.patch(`/api/v1/companies/${company_id}/info`, formData);
};