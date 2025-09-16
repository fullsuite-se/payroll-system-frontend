import { useState } from "react";

const useTopNav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("system_user_id");
        window.location.href = "/";
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
        "/attendance/holiday": "Holiday",
        "/company": "Company",
    }

    return {
        dropdownOpen, setDropdownOpen,
        handleLogout,
        paths,
    }
};

export default useTopNav;