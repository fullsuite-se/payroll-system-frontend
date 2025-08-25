import { createContext, useContext } from "react";
import useUser from "../hooks/user/useUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const user = useUser();

    return (
        <UserContext.Provider
            value={{
                ...user
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
