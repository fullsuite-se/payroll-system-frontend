import { BellIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { useLocation } from "react-router-dom";
import useTopNav from "../hooks/nav/useTopNav";

const TopNav = ({ user = { name: "Jun Jun Zaragosa", position: "Software Engineer" } }) => {
    const { dropdownOpen, setDropdownOpen, handleLogout, paths } = useTopNav();

    // Create initials for avatar
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    const location = useLocation();
    const pathname = location.pathname;


    return (
        <nav className="w-full pl-6 pr-12 pt-6 pb-3 flex justify-between h-[10vh]">
            <div className="font-extrabold ">
                {paths[pathname]}
            </div>

            <div className="flex  gap-6">
                {/* Notifications */}
                <button className="relative focus:outline-none">
                    <BellIcon className="h-5 w-5 text-gray-400 hover:text-gray-700 transition" />
                </button>

                {/* User Info & Dropdown */}
                <div className="relative flex items-center gap-2 cursor-pointer">
                    {/* Avatar */}
                    <div className="h-9 w-9 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold">
                        {initials}
                    </div>

                    {/* Name & Role */}
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.position}</p>
                    </div>

                    {/* Dropdown Toggle */}
                    <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <ChevronDownIcon
                            className={`h-4 w-4 text-gray-600 transform transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"
                                }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 top-12 w-40 bg-white border border-gray-300 rounded-lg z-20">
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-t-xl"
                            >
                                Profile
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-t-xl"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
