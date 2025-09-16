import { XCircleIcon } from "@heroicons/react/24/solid";

const HolidayModal = ({ title, description, onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop (blocks interaction & darkens background, no close on click) */}
            <div className="fixed inset-0 bg-black/50" />

            {/* Modal content */}
            <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl flex flex-col z-10">
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
                        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    </div>
                </div>
                {children}
            </div>

        </div>
    );

};

export default HolidayModal;