import { createContext, useContext } from "react";
import useCompany from "../hooks/useCompany";
import DualBallLoading from "../components/DualBallLoading";

//context
const CompanyContext = createContext();

//provider
export const CompanyProvider = ({ children }) => {
    const company = useCompany();

    // Wait for both initial loading and company full detail loading to finish
    if (company.loading || company.isCompanyFullDetailLoading) {
        return (
            <DualBallLoading />
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