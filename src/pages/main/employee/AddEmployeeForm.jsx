import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEmployeeContext } from "../../../contexts/EmployeeProvider";

const AddEmployeeForm = () => {
    const {
        employeesFormData,
        handleAddRow,
        handleRemoveRow,
        handleFieldChange,
        handleAddEmployees,
        handleResetForm
    } = useEmployeeContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddEmployees();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Table Header */}
            <div className="overflow-x-auto">
                <div className="min-w-max">
                    {/* Header Row */}
                    <div className="grid grid-cols-[40px_150px_150px_150px_150px_200px_200px_150px_150px_120px_200px_200px_120px_120px_120px_100px_120px_120px_150px_80px] gap-3 p-3 bg-gray-50 rounded-t-lg border-b border-gray-200 text-sm font-medium text-gray-700">
                        <div></div>
                        <div>Employee Id</div>
                        <div>First Name *</div>
                        <div>Middle Name</div>
                        <div>Last Name *</div>
                        <div>Personal Email *</div>
                        <div>Work Email *</div>
                        <div>Job Title *</div>
                        <div>Department *</div>
                        <div>Employment Status *</div>
                        <div>Permanent Address *</div>
                        <div>Current Address *</div>
                        <div>Civil Status *</div>
                        <div>Date Hired *</div>
                        <div>Date End</div>
                        <div>Sex *</div>
                        <div>Base Pay *</div>
                        <div>Base Pay Start Date *</div>
                        <div>Change Type *</div>
                        <div></div>
                    </div>

                    {/* Employee Rows */}
                    <div className="space-y-0">
                        {employeesFormData.map((employee, index) => (
                            <div key={employee.id} className="grid grid-cols-[40px_150px_150px_150px_150px_200px_200px_150px_150px_120px_200px_200px_120px_120px_120px_100px_120px_120px_150px_80px] gap-3 p-3 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                {/* Row Number */}
                                <div className="flex items-center justify-center text-sm text-gray-500 font-medium">
                                    {index + 1}
                                </div>

                                {/* Employee Id */}
                                <input
                                    type="text"
                                    value={employee.employee_id}
                                    onChange={(e) => handleFieldChange(employee.id, 'employee_id', e.target.value)}
                                    placeholder="Employee Id"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />

                                {/* First Name */}
                                <input
                                    type="text"
                                    value={employee.first_name}
                                    onChange={(e) => handleFieldChange(employee.id, 'first_name', e.target.value)}
                                    placeholder="First name"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    maxLength={100}
                                />

                                {/* Middle Name */}
                                <input
                                    type="text"
                                    value={employee.middle_name || ''}
                                    onChange={(e) => handleFieldChange(employee.id, 'middle_name', e.target.value)}
                                    placeholder="Middle name"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    maxLength={100}
                                />

                                {/* Last Name */}
                                <input
                                    type="text"
                                    value={employee.last_name}
                                    onChange={(e) => handleFieldChange(employee.id, 'last_name', e.target.value)}
                                    placeholder="Last name"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    maxLength={100}
                                />

                                {/* Personal Email */}
                                <input
                                    type="email"
                                    value={employee.personal_email}
                                    onChange={(e) => handleFieldChange(employee.id, 'personal_email', e.target.value)}
                                    placeholder="personal@email.com"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    maxLength={100}
                                    required
                                />

                                {/* Work Email */}
                                <input
                                    type="email"
                                    value={employee.work_email}
                                    onChange={(e) => handleFieldChange(employee.id, 'work_email', e.target.value)}
                                    placeholder="work@company.com"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    maxLength={100}
                                    required
                                />

                                {/* Job Title */}
                                <input
                                    type="text"
                                    value={employee.job_title}
                                    onChange={(e) => handleFieldChange(employee.id, 'job_title', e.target.value)}
                                    placeholder="Job title"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    maxLength={100}
                                    required
                                />

                                {/* Department */}
                                <input
                                    type="text"
                                    value={employee.department}
                                    onChange={(e) => handleFieldChange(employee.id, 'department', e.target.value)}
                                    placeholder="Department"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    maxLength={100}
                                    required
                                />

                                {/* Employment Status - Dropdown */}
                                <select
                                    value={employee.employement_status ? 'active' : 'inactive'}
                                    onChange={(e) => handleFieldChange(employee.id, 'employement_status', e.target.value === 'active')}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                {/* Permanent Address */}
                                <input
                                    type="text"
                                    value={employee.permanent_address}
                                    onChange={(e) => handleFieldChange(employee.id, 'permanent_address', e.target.value)}
                                    placeholder="Permanent Address"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />

                                {/* Current Address */}
                                <input
                                    type="text"
                                    value={employee.current_address}
                                    onChange={(e) => handleFieldChange(employee.id, 'current_address', e.target.value)}
                                    placeholder="Current Address"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />

                                {/* Civil Status - Dropdown */}
                                <select
                                    value={employee.civil_status}
                                    onChange={(e) => handleFieldChange(employee.id, 'civil_status', e.target.value)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                >
                                    <option value="">Select Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                </select>

                                {/* Date Hired - Date input */}
                                <input
                                    type="date"
                                    value={employee.date_hired}
                                    onChange={(e) => handleFieldChange(employee.id, 'date_hired', e.target.value)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />

                                {/* Date End - Date input */}
                                <input
                                    type="date"
                                    value={employee.date_end || ''}
                                    onChange={(e) => handleFieldChange(employee.id, 'date_end', e.target.value || null)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                {/* Sex - Dropdown */}
                                <select
                                    value={employee.sex}
                                    onChange={(e) => handleFieldChange(employee.id, 'sex', e.target.value)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                                {/* Base Pay */}
                                <input
                                    type="number"
                                    value={employee.base_pay || ''}
                                    onChange={(e) => handleFieldChange(employee.id, 'base_pay', e.target.value ? Number(e.target.value) : null)}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />

                                {/* Base Pay Start Date - Date input */}
                                <input
                                    type="date"
                                    value={employee.date || ''}
                                    onChange={(e) => handleFieldChange(employee.id, 'date', e.target.value || null)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />

                                {/* Change Type - Dropdown */}
                                <select
                                    value={employee.change_type}
                                    onChange={(e) => handleFieldChange(employee.id, 'change_type', e.target.value)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                >
                                    <option value="">Select Type</option>
                                    <option value="STARTING">Starting</option>
                                    <option value="INCREASE">Increase</option>
                                    <option value="CORRECTION">Correction</option>
                                </select>

                                {/* Remove Button */}
                                <div className="flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveRow(employee.id)}
                                        disabled={employeesFormData.length === 1}
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
                        Add Another Employee
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200 gap-x-2">
                <button
                    type="button"
                    className="px-6 py-2 hover:bg-gray-300 text-sm bg-gray-200 rounded-full "
                    onClick={handleResetForm}
                >
                    Reset
                </button>
                <button
                    type="submit"
                    className="px-6 py-2  bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    Add Employees
                </button>
            </div>
        </form>
    );
};

export default AddEmployeeForm;