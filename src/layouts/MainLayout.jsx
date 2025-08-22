import Sidebar from "../components/Sidebar.component";

const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;