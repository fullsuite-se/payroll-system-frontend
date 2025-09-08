import { XCircleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

const EmployeeCard = ({ employee, setEmployee }) => {
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
    const activeSalary = employee_salaries?.find(s => s.is_active);

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
                    <span
                        className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${employement_status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
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
                            : "N/A"}
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

                {/* Salary */}
                {activeSalary && (
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-gray-700">Compensation</h3>
                        <p className="text-gray-600 text-sm">
                            Base Pay: ${parseFloat(activeSalary.base_pay).toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-xs">
                            Effective: {format(new Date(activeSalary.date), "MMM dd, yyyy")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeCard;