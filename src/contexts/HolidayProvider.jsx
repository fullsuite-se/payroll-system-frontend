import { createContext, useContext } from "react";
import useHoliday from "../hooks/useHoliday";


//context
const HolidayContext = createContext();

//provider
export const HolidayProvider = ({ children }) => {
    const holiday = useHoliday();

    return (
        <HolidayContext.Provider value={{ ...holiday }} >
            {children}
        </HolidayContext.Provider>
    );
}

//hooks/consumer
export const useHolidayContext = () => useContext(HolidayContext);