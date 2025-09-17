import { useHolidayContext } from "../../../../contexts/HolidayProvider";

const UpdateHolidayForm = () => {
    const {
        handleUpdateFormChange,
        updateHolidayFormData,
        handleUpdateHoliday,
        updateLoading,
        handleShowUpdateHolidayModal // Changed from handleShowAddHolidayModal
    } = useHolidayContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateHoliday();
    }

    const handleCancel = () => {
        handleShowUpdateHolidayModal(); // Changed from handleShowAddHolidayModal
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 px-5 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Holiday Date *
                    </label>
                    <input
                        type="date"
                        value={updateHolidayFormData?.holiday_date || ''} // Added null check
                        onChange={(e) => handleUpdateFormChange('holiday_date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Holiday Name *
                    </label>
                    <input
                        type="text"
                        value={updateHolidayFormData?.holiday_name || ''}
                        onChange={(e) => handleUpdateFormChange('holiday_name', e.target.value)}
                        placeholder="Enter holiday name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Holiday Type *
                    </label>
                    <select
                        value={updateHolidayFormData?.holiday_type || "REGULAR"}
                        onChange={(e) => handleUpdateFormChange('holiday_type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                    >
                        <option value="REGULAR">Regular</option>
                        <option value="SPECIAL">Special</option>
                        <option value="CUSTOM">Custom</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Holiday Rate *
                    </label>
                    <input
                        type="number"
                        value={updateHolidayFormData?.holiday_rate || ''} // Added null check
                        onChange={(e) => handleUpdateFormChange('holiday_rate', e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        max="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={updateLoading}
                    className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={updateLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 disabled:opacity-50"
                >
                    {updateLoading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                        </div>
                    ) : (
                        "Update Holiday"
                    )}
                </button>
            </div>
        </form>
    );
};

export default UpdateHolidayForm;