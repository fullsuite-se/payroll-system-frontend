import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useHolidayContext } from "../../../../contexts/HolidayProvider";
import { convertToISO8601 } from "../../../../utility/datetime.utility";

const HolidayList = () => {
    const {
        holidays,
        selectedHoliday,
        holidaysLoading,
        deleteLoading,
        handleChangeSelectedHoliday,
        handleDeleteHoliday,
        handleEditHoliday, // Added this from the hook
    } = useHolidayContext();

    const getHolidayTypeColor = (type) => {
        switch (type) {
            case "REGULAR":
                return "bg-blue-50 text-blue-600 border-blue-200";
            case "SPECIAL":
                return "bg-purple-50 text-purple-600 border-purple-200";
            case "CUSTOM":
                return "bg-emerald-50 text-emerald-600 border-emerald-200";
            default:
                return "bg-gray-50 text-gray-600 border-gray-200";
        }
    };

    if (holidaysLoading) {
        return (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Holidays</h2>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse h-12 bg-gray-100 rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 px-2 py-1">
            {holidays.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <div className="text-sm">No holidays found</div>
                </div>
            ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {holidays.map((holiday) => (
                        <div
                            key={holiday.company_holiday_id}
                            onClick={() => handleChangeSelectedHoliday(holiday)}
                            className={`group flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 border
                                ${selectedHoliday?.company_holiday_id === holiday.company_holiday_id
                                    ? "bg-blue-50 border-blue-200"
                                    : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                                }`}
                        >
                            <div className="flex items-center space-x-4 flex-1 min-w-0">
                                {/* Holiday Type Badge */}
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getHolidayTypeColor(
                                        holiday.holiday_type
                                    )}`}
                                >
                                    {holiday.holiday_type.toLowerCase()}
                                </span>

                                {/* Holiday Name */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {holiday.holiday_name}
                                    </p>
                                </div>

                                {/* Holiday Date */}
                                <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                                    {convertToISO8601(holiday.holiday_date)}
                                </div>

                                {/* Holiday Rate */}
                                <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                                    {Number(holiday.holiday_rate).toFixed(2)}×
                                </div>
                            </div>

                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditHoliday(holiday); // Fixed: Added proper edit handler
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                    title="Edit holiday"
                                >
                                    <PencilSquareIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (
                                            window.confirm("Are you sure you want to delete this holiday?")
                                        ) {
                                            handleDeleteHoliday(holiday.company_holiday_id);
                                        }
                                    }}
                                    disabled={deleteLoading === holiday.company_holiday_id}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50"
                                    title="Delete holiday"
                                >
                                    {deleteLoading === holiday.company_holiday_id ? (
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <TrashIcon className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HolidayList;