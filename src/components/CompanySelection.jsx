import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useCompanyContext } from "../contexts/CompanyProvider";
import AddCompanyModal from "./AddCompanyModal";

const CompanySelection = () => {
    const {
        company,
        loading,
        dropdownOpen,
        setDropdownOpen,
        companies,
        changeSelectedCompany,
        isAddCompanyModalOpen,
        setIsAddCompanyModalOpen
    } = useCompanyContext();

    if (loading) return <div>Loading...</div>;

    if (!company) return (
        <div className="flex items-center gap-3 p-2">
            {/* Placeholder Avatar */}
            <div className="h-9 w-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                N/A
            </div>

            {/* Create New Button */}
            <button
                onClick={() => {
                    setIsAddCompanyModalOpen(true);
                    setDropdownOpen(false);
                }}
                className="text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl transition"
            >
                + Create New
            </button>
            {isAddCompanyModalOpen && (<AddCompanyModal />)}
        </div>
    );


    return (
        <>
            <div className="flex items-center justify-between w-full py-2 gap-1 relative">
                {/* Logo */}
                <img src={company.company_logo} className="h-9 w-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold" />
                {/*Info */}
                <div className="flex items-center gap-3">
                    <div>
                        <p className="text-sm font-bold ">{company.company_name}</p>
                        <p className="text-sm font-light text-gray-600">{company.company_trade_name}</p>
                    </div>
                </div>
                {/* Dropdown */}
                <div className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <ChevronDownIcon
                            className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute left-3 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                <p className="text-sm font-semibold text-gray-800">Companies</p>
                                <p className="text-xs text-gray-500">Select a company to manage</p>
                            </div>

                            {/* Options */}
                            <div className="py-2">
                                {companies.map((c, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => changeSelectedCompany(c)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                                    >
                                        {c.company_name}
                                    </button>
                                ))}
                                <div
                                    onClick={() => {
                                        setIsAddCompanyModalOpen(!isAddCompanyModalOpen);
                                        setDropdownOpen(false);
                                    }}
                                    className="flex justify-center pt-5">
                                    <button className="text-sm text-teal-600 font-semibold hover:cursor-pointer">+ Create New</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isAddCompanyModalOpen && (<AddCompanyModal />)}
        </>
    );
};

export default CompanySelection;
