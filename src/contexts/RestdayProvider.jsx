import { createContext, useContext } from "react";
import useRestday from "../hooks/useRestday";


//context
const RestdayContext = createContext();

//provider
export const RestdayProvider = ({ children }) => {
    const restday = useRestday();

    if (restday.isRestdaysLoading) return null;

    return (
        <RestdayContext.Provider value={{ ...restday }} >
            {children}
        </RestdayContext.Provider>
    );
}

//hooks/consumer
export const useRestdayContext = () => useContext(RestdayContext);