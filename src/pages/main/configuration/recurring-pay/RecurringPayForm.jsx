import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { usePayitemContext } from "../../../../contexts/PayitemProvider";
import { useRecurringPayContext } from "../../../../contexts/RecurringPayProvider";

const RecurringPayForm = () => {
    const {
        handleRemoveRow,
        handleAddRow,
        handleResetForm,
        handleFieldChange,
        handleAddRecurringPays,
        recurringPayFormData,
        recurringPayAddLoading
    } = useRecurringPayContext();

    const { payitems } = usePayitemContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddRecurringPays();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Table Header */}
                <div className="overflow-x-auto">
                    <div className="min-w-max">
                        {/* Header Row */}
                        <div className="grid grid-cols-[40px_150px_150px_200px_200px_120px_120px] gap-3 p-3 bg-gray-50 rounded-t-lg border-b border-gray-200 text-sm font-medium text-gray-700">
                            <div></div>
                            <div>Employee Id *</div>
                            <div>Pay Item *</div>
                            <div>Amount</div>
                            <div>Date Start</div>
                            <div>Date End</div>
                            <div></div>
                        </div>

                        {/* Employee Rows */}
                        <div className="space-y-0">
                            {recurringPayFormData.map((recurring, index) => (
                                <div key={recurring.id} className="grid grid-cols-[40px_150px_150px_200px_200px_120px_120px] gap-3 p-3 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                    {/* Row Number */}
                                    <div className="flex items-center justify-center text-sm text-gray-500 font-medium">
                                        {index + 1}
                                    </div>

                                    {/* Employee Id */}
                                    <input
                                        type="text"
                                        value={recurring.employee_id || ''}
                                        onChange={(e) => handleFieldChange(recurring.id, 'employee_id', e.target.value)}
                                        placeholder="Employee Id"
                                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />

                                    {/* Pay item */}
                                    <select
                                        value={recurring.payitem_id || ''}
                                        onChange={(e) => handleFieldChange(recurring.id, 'payitem_id', e.target.value)}
                                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                        required
                                    >
                                        <option value="">Select Pay Item</option>
                                        {
                                            payitems.map((item) => (
                                                <option key={item.payitem_id} value={item.payitem_id} className="text-gray-900">
                                                    {item.payitem_name}
                                                </option>
                                            ))
                                        }
                                    </select>

                                    {/* Amount */}
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={recurring.amount || ''}
                                        onChange={(e) => handleFieldChange(recurring.id, 'amount', e.target.value)}
                                        placeholder="0.00"
                                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />

                                    {/* Start Date */}
                                    <input
                                        type="date"
                                        value={recurring.date_start || ''}
                                        onChange={(e) => handleFieldChange(recurring.id, 'date_start', e.target.value || '')}
                                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />

                                    {/* End Date */}
                                    <input
                                        type="date"
                                        value={recurring.date_end || ''}
                                        onChange={(e) => handleFieldChange(recurring.id, 'date_end', e.target.value || '')}
                                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />

                                    {/* Remove Button */}
                                    <div className="flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRow(recurring.id)}
                                            disabled={recurringPayFormData.length === 1}
                                            className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                            title="Remove row"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Row Button */}
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={handleAddRow}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Another Row
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200 gap-x-2">
                    <button
                        type="button"
                        className="px-6 py-2 hover:bg-gray-300 text-sm bg-gray-200 rounded-full"
                        onClick={handleResetForm}
                        disabled={recurringPayAddLoading}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={recurringPayAddLoading}
                        className="px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        {recurringPayAddLoading ? "Loading..." : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RecurringPayForm;