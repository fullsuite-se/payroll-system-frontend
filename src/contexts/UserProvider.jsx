import { createContext, useContext } from "react";
import useUser from "../hooks/user/useUser";

//context
const UserContext = createContext();

//provider
export const UserProvider = ({ children }) => {
    const user = useUser();

    return (
        <UserContext.Provider value={{ ...user }}>
            {children}
        </UserContext.Provider>
    );
};

//hooks/consumer
export const useUserContext = () => useContext(UserContext);
