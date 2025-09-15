import { createContext, useContext } from "react";
import useCompany from "../hooks/useCompany";
import DualBallLoading from "../assets/dual-ball-loading.svg";

//context
const CompanyContext = createContext();

//provider
export const CompanyProvider = ({ children }) => {
    const company = useCompany();

    // Wait for both initial loading and company full detail loading to finish
    if (company.loading || company.isCompanyFullDetailLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <img
                    src={DualBallLoading}
                    alt="Loading animation"
                    className="w-16 h-16"
                />
                <p className="text-lg text-gray-600 font-medium">Loading...</p>
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