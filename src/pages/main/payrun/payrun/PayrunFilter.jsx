const PayrunFilter = () => {
    return (
        <div className="flex items-end justify-between gap-6">
            {/* Fields */}
            <div className="flex flex-row gap-6">
                {/* Date */}
                <div className="flex gap-1 items-center justify-center ">
                    <label className="text-xs font-medium text-gray-700">From</label>
                    <input
                        type="date"
                        className="w-40 rounded-full bg-white border border-gray-300 px-3 py-1 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                    />
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <button
                        type="button"
                        className="bg-teal-600 hover:bg-teal-700 border border-teal-600 text-white text-sm px-4 py-1 rounded-full cursor-pointer transition"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Status Dropdown */}
            <div className="flex gap-1 items-center justify-center ">
                <label className="text-xs font-medium text-gray-700">
                    Status
                </label>
                <select className="px-4 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-32 bg-white cursor-pointer transition">
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        </div>
    );
};

export default PayrunFilter;