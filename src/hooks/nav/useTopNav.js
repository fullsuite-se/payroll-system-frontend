import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useTopNav = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        navigate("/");
    };

    const paths = {
        "/dashboard": "Dashboard",
        "/payrun": "Payrun",
        "/payrun/regular": "Regular Payrun",
        "/payrun/last": "Last Payrun",
        "/payrun/special": "Special Payrun",
        "/employee": "Employee",
        "/attendance": "Attendance",
        "/attendance/overtime": "Overtime",
        "/attendance/leave": "Leave",
        "/attendance/absence": "Absence",
        "/attendance/restday": "Restday",
        "/company": "Company",
    }

    return {
        dropdownOpen, setDropdownOpen,
        handleLogout,
        paths,
    }
};

export default useTopNav;