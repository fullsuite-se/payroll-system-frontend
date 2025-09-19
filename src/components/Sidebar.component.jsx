import { RocketLaunchIcon } from "@heroicons/react/16/solid";
import { Link, useLocation } from "react-router-dom";
import CompanySelection from "./CompanySelection";

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItemClasses = (path) =>
        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors text-sm
     ${isActive(path)
            ? "text-teal-600 font-semibold bg-teal-50"
            : "text-gray-600 hover:text-teal-500 hover:bg-gray-50"
        }`;

    const sidebarSections = [
        {
            title: null,
            items: [{ label: "Dashboard", path: "/dashboard" }],
        },
        {
            title: "Payrun",
            items: [
                { label: "Payrun", path: "/payrun" },
                { label: "Regular Payrun", path: "/payrun/regular" },
                { label: "Last Payrun", path: "/payrun/last" },
                { label: "Special Payrun", path: "/payrun/special" },
            ],
        },
        {
            title: null,
            items: [{ label: "Employee", path: "/employee" }],
        },
        {
            title: "Attendance",
            items: [
                { label: "Attendance", path: "/attendance" },
                { label: "Overtime", path: "/attendance/overtime" },
                { label: "Leave", path: "/attendance/leave" },
                { label: "Absence", path: "/attendance/absence" },
                { label: "Restday", path: "/attendance/restday" },
                { label: "Holiday", path: "/attendance/holiday" },
            ],
        },
        // {
        //     title: null,
        //     items: [{ label: "Company", path: "/company" }],
        // },
        {
            title: "Configuration",
            items: [
                { label: "Payitems", path: "/configuration/payitem" },
                { label: "Recurring Pay", path: "/configuration/recurring-pay" },
                { label: "Comp. Config.", path: "/configuration/company-configuration" },
            ],
        },

    ];

    return (
        <aside className="w-52 bg-white border-r border-gray-200 h-screen p-4 flex flex-col">
            <CompanySelection />
            <nav className="flex flex-col pt-5 gap-4 text-sm">
                {sidebarSections.map((section, idx) => (
                    <div key={idx}>
                        {section.title && (
                            <h3 className="text-[11px] font-semibold text-gray-400 uppercase mb-1 tracking-wide">
                                {section.title}
                            </h3>
                        )}

                        <div
                            className={`flex flex-col ${section.title ? "pl-4 border-l border-gray-200" : ""
                                } space-y-1`}
                        >
                            {section.items.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={navItemClasses(item.path)}
                                >
                                    {isActive(item.path) && (
                                        <RocketLaunchIcon className="w-3.5 h-3.5 text-teal-600" />
                                    )}
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
