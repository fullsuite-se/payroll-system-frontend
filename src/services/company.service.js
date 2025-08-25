import payroll_api from "../configs/payroll_api.config";


export const getCompaniesService = async () => {
    return await payroll_api.get("/api/v1/companies/access/me");
};

