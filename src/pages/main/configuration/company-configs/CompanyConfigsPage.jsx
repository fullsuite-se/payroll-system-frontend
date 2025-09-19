// import { PencilIcon } from "@heroicons/react/24/solid";
// import { useCompanyContext } from "../../../../contexts/CompanyProvider";

// const CompanyConfigsPage = () => {
//     const { workingDays, payrollFrequency } = useCompanyContext();

//     return (
//         <div>
//             working days:   {workingDays}
//         </div>
//     )
// };

// export default CompanyConfigsPage;


import { PencilIcon } from "@heroicons/react/24/solid";
import { useCompanyContext } from "../../../../contexts/CompanyProvider";

const CompanyConfigsPage = () => {
    const { workingDays, payrollFrequency } = useCompanyContext();

    const configs = [
        {
            name: "Working Days",
            value: workingDays,
            description: "Number of working days in a week.",
        },
        {
            name: "Payroll Frequency",
            value: payrollFrequency,
            description: "How often payroll is processed.",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {configs.map((config) => (
                <div
                    key={config.name}
                    className="bg-white rounded-2xl p-6 flex flex-col justify-between"
                >
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                            {config.name}
                            <button className="text-gray-500 hover:text-gray-700">
                                <PencilIcon className="w-4 h-4" />
                            </button>
                        </h2>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                            {config.value}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{config.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CompanyConfigsPage;
