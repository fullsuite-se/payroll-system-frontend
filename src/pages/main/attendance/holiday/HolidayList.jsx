// import { TrashIcon } from "@heroicons/react/24/solid";
// import { useHolidayContext } from "../../../../contexts/HolidayProvider";
// import { convertToISO8601 } from "../../../../utility/datetime.utility";

// const HolidayList = () => {
//     const {
//         holidays,
//         selectedHoliday,
//         holidaysLoading,
//         deleteLoading,
//         handleChangeSelectedHoliday,
//         handleDeleteHoliday
//     } = useHolidayContext();


//     const getHolidayTypeColor = (type) => {
//         switch (type) {
//             case 'REGULAR': return 'bg-blue-100 text-blue-800';
//             case 'SPECIAL': return 'bg-purple-100 text-purple-800';
//             case 'CUSTOM': return 'bg-green-100 text-green-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     if (holidaysLoading) {
//         return (
//             <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Holidays</h2>
//                 <div className="space-y-3">
//                     {[1, 2, 3].map((i) => (
//                         <div key={i} className="animate-pulse">
//                             <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                             <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-white rounded-lg shadow-md p-6">
//             {holidays.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">

//                     <p className="mt-2">No holidays found</p>
//                 </div>
//             ) : (
//                 <div className="space-y-3 max-h-96 overflow-y-auto">
//                     {holidays.map((holiday) => (
//                         <div
//                             key={holiday.company_holiday_id}
//                             className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedHoliday?.company_holiday_id === holiday.company_holiday_id
//                                 ? 'border-blue-500 bg-blue-50'
//                                 : 'border-gray-200 hover:border-gray-300'
//                                 }`}
//                             onClick={() => handleChangeSelectedHoliday(holiday)}
//                         >
//                             <div className="flex items-start justify-between">
//                                 <div className="flex-1">
//                                     <h3 className="font-medium text-gray-900 text-sm">
//                                         {holiday.holiday_name}
//                                     </h3>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                         {convertToISO8601(holiday.holiday_date)}
//                                     </p>
//                                     <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${getHolidayTypeColor(holiday.holiday_type)}`}>
//                                         {holiday.holiday_type.toLowerCase()}
//                                     </span>
//                                     <div className="mt-2 text-xs text-gray-600">
//                                         Rate: {Number(holiday.holiday_rate).toFixed(2)}x
//                                     </div>
//                                 </div>

//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         if (window.confirm('Are you sure you want to delete this holiday?')) {
//                                             handleDeleteHoliday(holiday.company_holiday_id);
//                                         }
//                                     }}
//                                     disabled={deleteLoading === holiday.company_holiday_id}
//                                     className="ml-2 text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors"
//                                 >
//                                     <TrashIcon className="h-6 w-6" />
//                                 </button>
//                             </div>


//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default HolidayList;

import { TrashIcon } from "@heroicons/react/24/solid";
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
    } = useHolidayContext();

    const getHolidayTypeColor = (type) => {
        switch (type) {
            case "REGULAR":
                return "bg-blue-100 text-blue-800";
            case "SPECIAL":
                return "bg-purple-100 text-purple-800";
            case "CUSTOM":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (holidaysLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-base font-semibold text-gray-800 mb-3">Holidays</h2>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse h-5 bg-gray-200 rounded w-3/4" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            {holidays.length === 0 ? (
                <div className="text-center py-6 text-gray-500">No holidays found</div>
            ) : (
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {holidays.map((holiday) => (
                        <div
                            key={holiday.company_holiday_id}
                            onClick={() => handleChangeSelectedHoliday(holiday)}
                            className={`flex items-center justify-between px-2 py-3 cursor-pointer transition-colors 
                ${selectedHoliday?.company_holiday_id === holiday.company_holiday_id
                                    ? "bg-blue-50 border-l-4 border-blue-500"
                                    : "hover:bg-gray-50"
                                }`}
                        >
                            <div className="flex items-center space-x-4 flex-1 min-w-0">
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full ${getHolidayTypeColor(
                                        holiday.holiday_type
                                    )}`}
                                >
                                    {holiday.holiday_type.toLowerCase()}
                                </span>
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {holiday.holiday_name}
                                </p>
                                <p className="text-xs text-gray-500 shrink-0">
                                    {convertToISO8601(holiday.holiday_date)}
                                </p>
                                <p className="text-xs text-gray-600 shrink-0">
                                    {Number(holiday.holiday_rate).toFixed(2)}x
                                </p>
                            </div>
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
                                className="ml-2 text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HolidayList;
