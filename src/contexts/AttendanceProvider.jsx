import { createContext, useContext } from "react";
import useAttendance from "../hooks/useAttendance";

//context
const AttendanceContext = createContext();


//provider
export const AttendanceProvider = ({ children }) => {
    const attendance = useAttendance();

    // if (attendance.isAttendancesLoading) return null;

    return (
        <AttendanceContext.Provider value={{ ...attendance }}>
            {children}
        </AttendanceContext.Provider>
    )
}

//hooks/consumer
export const useAttendanceContext = () => useContext(AttendanceContext);