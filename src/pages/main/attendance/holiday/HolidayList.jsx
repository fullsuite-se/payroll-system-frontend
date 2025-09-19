import {
    ArrowRightCircleIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
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
        handleEditHoliday,
    } = useHolidayContext();

    if (holidaysLoading) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Holidays</h2>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse h-10 bg-gray-100 rounded-md" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-2 py-1">
            {holidays.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                    No holidays found
                </div>
            ) : (
                <div className="space-y-2 max-h-dvh overflow-y-auto">
                    {holidays.map((holiday) => {
                        const isSelected =
                            selectedHoliday?.company_holiday_id === holiday.company_holiday_id;

                        return (
                            <div
                                key={holiday.company_holiday_id}
                                onClick={() => handleChangeSelectedHoliday(holiday)}
                                className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors
                  ${isSelected
                                        ? "bg-white border border-teal-600"
                                        : "bg-white"
                                    }`}
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    {isSelected && (
                                        <ArrowRightCircleIcon className="h-5 w-5 text-teal-500 shrink-0" />
                                    )}

                                    {/* Holiday Name */}
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {holiday.holiday_name}
                                    </p>

                                    {/* Holiday Date */}
                                    <span className="text-xs text-gray-500 font-mono truncate">
                                        {convertToISO8601(holiday.holiday_date)}
                                    </span>

                                    {/* Holiday Rate */}
                                    <span className="text-xs text-gray-500 font-mono truncate">
                                        {Number(holiday.holiday_rate).toFixed(2)}×
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditHoliday(holiday);
                                        }}
                                        className="p-1 text-gray-400 hover:text-teal-500 rounded-md transition-colors"
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
                                        className="p-1 text-gray-400 hover:text-red-500 rounded-md transition-colors disabled:opacity-50"
                                        title="Delete holiday"
                                    >
                                        {deleteLoading === holiday.company_holiday_id ? (
                                            <div className="text-xs">...</div>
                                        ) : (
                                            <TrashIcon className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default HolidayList;
