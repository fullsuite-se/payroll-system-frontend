import { createContext, useContext } from "react";
import useLeave from "../hooks/useLeave";

//context
const LeaveContext = createContext();

//provider
export const LeaveProvider = ({ children }) => {
    const leave = useLeave();

    if (leave.isLeavesLoading) return null;

    return (
        <LeaveContext.Provider value={{ ...leave }} >
            {children}
        </LeaveContext.Provider>
    );
}

//hooks/consumer
export const useLeaveContext = () => useContext(LeaveContext);