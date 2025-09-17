import { XCircleIcon } from "@heroicons/react/24/solid";

const DailyRecordFilter = ({ onClickAdd, filters, onChangeFilter, resetFilter }) => {


    return (
        <div className="flex items-end justify-between gap-6">
            {/* Fields */}
            <div className="flex flex-row gap-6">
                {/* Employee */}
                <div className="flex flex-row gap-1 items-center">
                    <label className="mb-1 text-xs font-medium text-gray-700">Employee</label>
                    <input
                        type="text"
                        value={filters.employee_id}
                        onChange={(e) => onChangeFilter("employee_id", e.target.value)}
                        placeholder="Enter Employee ID"
                        className="w-48 rounded-full bg-white border border-gray-300 px-3 py-1 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                    />
                </div>

                {/* From */}
                <div className="flex flex-row items-center gap-1">
                    <label className="mb-1 text-xs  font-medium text-gray-700">From</label>
                    <input
                        type="date"
                        value={filters.from}
                        onChange={(e) => onChangeFilter("from", e.target.value)}
                        className="w-40 rounded-full bg-white border border-gray-300 px-3 py-1 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                    />
                </div>

                {/* To */}
                <div className="flex flex-row gap-1 items-center">
                    <label className="mb-1 text-xs font-medium text-gray-700">To</label>
                    <input
                        type="date"
                        value={filters.to}
                        onChange={(e) => onChangeFilter("to", e.target.value)}
                        className="w-40 bg-white rounded-full border border-gray-300 px-3 py-1 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                    />
                </div>

                <div className="flex flex-row items-center gap-1 hover:cursor-pointer hover:text-red-500" onClick={resetFilter}>
                    <XCircleIcon className="h-4 w-4s" />
                </div>



            </div>

            {/* Button */}
            <button
                onClick={onClickAdd}
                className="rounded-full bg-teal-600 px-3 py-1 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700 focus:ring-2 focus:ring-teal-400 focus:ring-offset-1"
            >
                Add +
            </button>
        </div>
    );
};

export default DailyRecordFilter;
