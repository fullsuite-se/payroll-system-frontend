import { createContext, useContext } from "react";
import useCompany from "../hooks/useCompany";

//context
const CompanyContext = createContext();

//provider
export const CompanyProvider = ({ children }) => {
    const company = useCompany();

    //wait for loading to finish before rendering children
    if (company.loading) return null;

    return (
        <CompanyContext.Provider value={{ ...company }}>
            {children}
        </CompanyContext.Provider>
    );
};

//hooks/consumer
export const useCompanyContext = () => useContext(CompanyContext);