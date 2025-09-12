import { createContext, useContext } from "react";
import useOvertime from "../hooks/useOvertime";

//context
const OvertimeContext = createContext();

//provider
export const OvertimeProvider = ({ children }) => {
    const overtime = useOvertime();

    if (overtime.isOvertimesLoading) return null;

    return (
        <OvertimeContext.Provider value={{ ...overtime }} >
            {children}
        </OvertimeContext.Provider>
    );
}

//hooks/consumer
export const useOvertimeContext = () => useContext(OvertimeContext);
