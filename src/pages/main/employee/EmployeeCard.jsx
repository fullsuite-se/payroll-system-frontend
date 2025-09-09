import { XCircleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import AddSalaryForm from "./AddSalaryForm";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const EmployeeCard = ({ employee, setEmployee, showAddSalaryForm, setShowAddSalaryForm }) => {
    if (!employee) {
        return null;
    }

    const {
        first_name,
        middle_name,
        last_name,
        job_title,
        department,
        employement_status,
        work_email,
        personal_email,
        employee_infos,
        employee_salaries
    } = employee;

    const fullName = [first_name, middle_name, last_name].filter(Boolean).join(" ");

    // Sort salaries by date (oldest first for chronological order)
    const sortedSalaries = employee_salaries?.sort((a, b) => new Date(a.date) - new Date(b.date)) || [];

    return (
        <div className="h-fit">
            <div className="relative bg-white shadow-sm rounded-2xl p-6 space-y-6 min-w-[350px] max-w-[400px]">
                {/* Close Icon */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setEmployee(null)}
                >
                    <XCircleIcon className="h-6 w-6" />
                </button>

                {/* Header */}
                <div className="pr-8">
                    <h2 className="text-xl font-semibold text-gray-800 break-words">{fullName}</h2>
                    <p className="text-gray-600 break-words">{job_title} • {department}</p>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${employement_status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                        {employement_status ? "Active" : "Inactive"}
                    </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-700">Contact</h3>
                    <p className="text-gray-600 text-sm break-all">Work: {work_email}</p>
                    <p className="text-gray-600 text-sm break-all">Personal: {personal_email}</p>
                </div>

                {/* Employment Info */}
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-700">Employment</h3>
                    <p className="text-gray-600 text-sm">
                        Date Hired:{" "}
                        {employee_infos?.date_hired
                            ? format(new Date(employee_infos.date_hired), "MMM dd, yyyy")
                            : "N/A"
                        }
                    </p>
                    {employee_infos?.date_end && (
                        <p className="text-gray-600 text-sm">
                            Date End: {format(new Date(employee_infos.date_end), "MMM dd, yyyy")}
                        </p>
                    )}
                    <p className="text-gray-600 text-sm">
                        Civil Status: {employee_infos?.civil_status || "N/A"}
                    </p>
                    <p className="text-gray-600 text-sm">Sex: {employee_infos?.sex || "N/A"}</p>
                    <p className="text-gray-600 text-sm break-words">
                        Current Address: {employee_infos?.current_address || "N/A"}
                    </p>
                    <p className="text-gray-600 text-sm break-words">
                        Permanent Address: {employee_infos?.permanent_address || "N/A"}
                    </p>
                </div>

                {/* Salary History */}
                {showAddSalaryForm ? (
                    <AddSalaryForm />
                ) : (
                    <>
                        {sortedSalaries.length > 0 && (
                            <div className="relative space-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-gray-700">Salary History</h3>
                                    <button
                                        onClick={() => setShowAddSalaryForm(true)}
                                        className="cursor-pointer"
                                    >
                                        <PlusCircleIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                    </button>
                                </div>

                                <div className="relative pl-4">
                                    {/* Vertical Line */}
                                    <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-200"></div>

                                    {/* Salary Items */}
                                    <div className="space-y-3">
                                        {sortedSalaries.map((salary, index) => (
                                            <div key={salary.employee_salary_id} className="relative">
                                                {/* Indicator Dot */}
                                                <div className={`absolute -left-[9px] top-1 w-3 h-3 rounded-full border-2 ${salary.is_active
                                                    ? "bg-green-500 border-green-500"
                                                    : "bg-white border-gray-300"
                                                    }`}></div>

                                                {/* Salary Details */}
                                                <div className="ml-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className={`text-sm font-medium ${salary.is_active ? "text-gray-900" : "text-gray-600"
                                                            }`}>
                                                            P{parseFloat(salary.base_pay).toLocaleString()}
                                                        </span>
                                                        {salary.is_active && (
                                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                                Current
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        {format(new Date(salary.date), "MMM dd, yyyy")} • {salary.change_type.toLowerCase()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default EmployeeCard;