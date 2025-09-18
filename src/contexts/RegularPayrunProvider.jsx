import { createContext, useContext } from "react";
import useRegularPayrun from "../hooks/useRegularPayrun";

//context
const RegularPayrunContext = createContext();

//provider
export const RegularPayrunProvider = ({ children }) => {
    const regularPayrun = useRegularPayrun();

    return (
        <RegularPayrunContext.Provider value={{ ...regularPayrun }} >
            {children}
        </RegularPayrunContext.Provider>
    );
};

//hooks/consumer
export const useRegularPayrunContext = () => useContext(RegularPayrunContext);