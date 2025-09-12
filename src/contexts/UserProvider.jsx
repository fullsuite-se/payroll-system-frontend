import { createContext, useContext } from "react";
import useUser from "../hooks/useUser";
import DualBallLoading from "../assets/dual-ball-loading.svg";

//context
const UserContext = createContext();

//provider
export const UserProvider = ({ children }) => {
    const user = useUser();

    //wait for loading to finish before rendering children
    if (user.loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <img
                src={DualBallLoading}
                alt="Loading animation"
                className="w-16 h-16"
            />
            <p className="text-lg text-gray-600 font-medium">Loading...</p>
        </div>
    );

    return (
        <UserContext.Provider value={{ ...user }}>
            {children}
        </UserContext.Provider>
    );
};

//hooks/consumer
export const useUserContext = () => useContext(UserContext);