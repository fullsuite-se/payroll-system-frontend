import { createContext, useContext } from "react";
import useAbsence from "../hooks/useAbsence";


//context
const AbsenceContext = createContext();

//provider
export const AbsenceProvider = ({ children }) => {
    const absence = useAbsence();

    // if (absence.isAbsencesLoading) return null;

    return (
        <AbsenceContext.Provider value={{ ...absence }} >
            {children}
        </AbsenceContext.Provider>
    );
}


//hooks/consumer
export const useAbsenceContext = () => useContext(AbsenceContext);