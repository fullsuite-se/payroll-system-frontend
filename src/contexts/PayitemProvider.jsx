import { createContext, useContext } from "react";
import usePayitem from "../hooks/usePayitem";

//context
const PayitemContext = createContext();

//provider
export const PayitemProvider = ({ children }) => {
    const payitem = usePayitem();

    return (
        <PayitemContext.Provider value={{ ...payitem }}>
            {children}
        </PayitemContext.Provider>
    );
}

//hooks/consumer
export const usePayitemContext = () => useContext(PayitemContext);