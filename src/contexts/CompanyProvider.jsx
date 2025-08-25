import { createContext, useContext } from "react";
import useCompany from "../hooks/company/useCompany";

//context
const CompanyContext = createContext();

//provider
export const CompanyProvider = ({ children }) => {
    const company = useCompany();

    return (
        <CompanyContext.Provider value={{ ...company }}>
            {children}
        </CompanyContext.Provider>
    );
};

//hooks/consumer
export const useCompanyContext = () => useContext(CompanyContext);