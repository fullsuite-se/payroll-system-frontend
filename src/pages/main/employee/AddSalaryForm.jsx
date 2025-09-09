import { useEmployeeContext } from "../../../contexts/EmployeeProvider";

export const AddSalaryForm = () => {
    const {
        salaryFormData = {},
        setSalaryFormData,
        handleAddSalary,
        isAddSalaryLoading,
        setShowAddSalaryForm,
    } = useEmployeeContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            handleAddSalary();
        } catch (error) {
            console.error("Error adding salary:", error);
        }
    };

    const handleChange = (e) => {
        setSalaryFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-6 max-w-lg mx-auto"
        >
            <h2 className="text-sm font-bold text-gray-700">Add Salary</h2>

            {/* Fields Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Employee ID */}
                {/* <div className="grid gap-1">
                    <label htmlFor="employee_id" className="text-xs text-gray-500">
                        Employee ID
                    </label>
                    <input
                        type="text"
                        id="employee_id"
                        name="employee_id"
                        value={salaryFormData.employee_id || ""}
                        onChange={handleChange}
                        required
                        className="border rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div> */}

                {/* Base Pay */}
                <div className="grid gap-1">
                    <label htmlFor="base_pay" className="text-xs text-gray-500">
                        Base Pay
                    </label>
                    <input
                        type="number"
                        id="base_pay"
                        name="base_pay"
                        value={salaryFormData.base_pay || ""}
                        onChange={handleChange}
                        required
                        className="border rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Date */}
                <div className="grid gap-1">
                    <label htmlFor="date" className="text-xs text-gray-500">
                        Effective Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={salaryFormData.date || ""}
                        onChange={handleChange}
                        required
                        className="border rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Change Type */}
                <div className="grid gap-1">
                    <label htmlFor="change_type" className="text-xs text-gray-500">
                        Change Type
                    </label>
                    <select
                        id="change_type"
                        name="change_type"
                        value={salaryFormData.change_type || "STARTING"}
                        onChange={handleChange}
                        className="border rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="STARTING">Starting</option>
                        <option value="INCREASE">Increase</option>
                        <option value="CORRECTION">Correction</option>
                    </select>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={() => setShowAddSalaryForm(false)}
                    className="px-2 py-1 text-sm text-gray-500 border rounded-lg hover:bg-gray-100 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isAddSalaryLoading}
                    className="px-2 py-1text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 transition"
                >
                    {isAddSalaryLoading ? "Saving..." : "Add"}
                </button>
            </div>
        </form>
    );
};

export default AddSalaryForm;
