import { Link, useLocation } from "react-router-dom";


const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 bg-gray-800 text-white h-screen p-4 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Payroll</h2>
            <nav className="flex flex-col gap-4">
                <div>
                    <Link
                        to="/dashboard"
                        className={`block hover:text-gray-300
                            ${isActive("/dashboard") ? "text-yellow-300 font-bold" : ""}
                        `}
                    >
                        Dashboard
                    </Link>
                </div>

                {/* Payrun group */}
                <h3 className="text-sm uppercase text-gray-400 mb-2">Users</h3>
                <div className="flex flex-col gap-2 pl-3">
                    <Link
                        to="/payrun"
                        className={`block hover:text-gray-300
                            ${isActive("/payrun") ? "text-yellow-300 font-bold" : ""}
                        `}
                    >
                        Payrun
                    </Link>
                    <Link
                        to="/payrun/regular"
                        className={`block hover:text-gray-300
                            ${isActive("/payrun/regular") ? "text-yellow-300 font-bold" : ""}
                        `}
                    >
                        Regular Payrun
                    </Link>
                    <Link
                        to="/payrun/last"
                        className={`block hover:text-gray-300
                            ${isActive("/payrun/last") ? "text-yellow-300 font-bold" : ""}
                        `}
                    >
                        Last Payrun
                    </Link>
                    <Link
                        to="/payrun/special"
                        className={`block hover:text-gray-300
                            ${isActive("/payrun/special") ? "text-yellow-300 font-bold" : ""}
                        `}
                    >
                        Special Payrun
                    </Link>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;