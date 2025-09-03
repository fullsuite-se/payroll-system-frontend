import { createContext, useContext } from "react";
import useUser from "../hooks/useUser";

//context
const UserContext = createContext();

//provider
export const UserProvider = ({ children }) => {
    const user = useUser();

    //wait for loading to finish before rendering children
    if (user.loading) return null;

    return (
        <UserContext.Provider value={{ ...user }}>
            {children}
        </UserContext.Provider>
    );
};

//hooks/consumer
export const useUserContext = () => useContext(UserContext);
