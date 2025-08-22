import Sidebar from "../components/Sidebar.component";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;