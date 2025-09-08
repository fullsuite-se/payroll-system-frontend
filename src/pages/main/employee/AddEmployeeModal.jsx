import { useEffect } from "react";
import { ArrowUpTrayIcon, XCircleIcon } from "@heroicons/react/24/outline";
import AddEmployeeForm from "./AddEmployeeForm";

const AddEmployeeModal = ({ onClose }) => {
    // Disable background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop (blocks interaction & darkens background, no close on click) */}
            <div className="fixed inset-0 bg-black/50" />

            {/* Modal content */}
            <div className="relative w-full max-w-7xl max-h-[90vh] rounded-2xl bg-white shadow-2xl flex flex-col z-10">
                {/* Header */}
                <div className="flex items-center justify-between p-8 pb-4 border-b border-gray-200 relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XCircleIcon className="h-6 w-6" />
                    </button>

                    {/* Title + Description */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Add Employees</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Employees added will be included in the payrun, depending on employment status.
                        </p>
                    </div>

                    {/* Upload Button */}
                    <button
                        className="ml-auto inline-flex items-center gap-2 rounded-full text-sm bg-white px-4 py-2 cursor-pointer font-medium border border-gray-300 active:scale-95 transition"
                    >
                        <ArrowUpTrayIcon className="h-5 w-5" />
                        Upload
                    </button>
                </div>

                {/* Scrollable form */}
                <div className="flex-1 overflow-y-auto p-8 pt-4">
                    <AddEmployeeForm />
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
