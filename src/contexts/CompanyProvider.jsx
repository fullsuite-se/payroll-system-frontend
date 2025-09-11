import { createContext, useContext } from "react";
import useCompany from "../hooks/useCompany";

//context
const CompanyContext = createContext();

//provider
export const CompanyProvider = ({ children }) => {
    const company = useCompany();

    // Wait for both initial loading and company full detail loading to finish
    if (company.loading || company.isCompanyFullDetailLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <CompanyContext.Provider value={{ ...company }}>
            {children}
        </CompanyContext.Provider>
    );
};

//hooks/consumer
export const useCompanyContext = () => useContext(CompanyContext);