import { createContext, useContext } from "react";
import useRecurringPay from "../hooks/useRecurringPay";

//context
const RecurringPayContext = createContext();

//provider
export const RecurringPayProvider = ({ children }) => {
    const recurringPay = useRecurringPay();

    return (
        <RecurringPayContext.Provider value={{ ...recurringPay }}>
            {children}
        </RecurringPayContext.Provider>
    );
};

//consumer/hook
export const useRecurringPayContext = () => useContext(RecurringPayContext);