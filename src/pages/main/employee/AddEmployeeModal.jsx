import { useEffect, useRef } from "react";
import { ArrowUpTrayIcon, XCircleIcon } from "@heroicons/react/24/outline";
import AddEmployeeForm from "./AddEmployeeForm";
import { useEmployeeContext } from "../../../contexts/EmployeeProvider";

const AddEmployeeModal = ({ onClose }) => {
    const fileInputRef = useRef(null);
    const { uploadEmployeeFile, isUploading } = useEmployeeContext();

    // Disable background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadEmployeeFile(file);
        }
        // Reset input to allow selecting the same file again
        event.target.value = '';
    };

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
                    <div className="ml-auto">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".xlsx,.xls"
                            className="hidden"
                        />
                        <button
                            onClick={handleUploadClick}
                            disabled={isUploading}
                            className={`inline-flex items-center gap-2 rounded-full text-sm px-4 py-2 font-medium border transition ${isUploading
                                ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95 cursor-pointer'
                                }`}
                        >
                            <ArrowUpTrayIcon className={`h-5 w-5 ${isUploading ? 'animate-pulse' : ''}`} />
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </div>

                {/* File format info */}
                <div className="px-8 py-2">
                    <p className="text-xs text-gray-500">
                        Supported formats: CSV, Excel (.xlsx, .xls). Column headers should match the form fields.
                    </p>
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