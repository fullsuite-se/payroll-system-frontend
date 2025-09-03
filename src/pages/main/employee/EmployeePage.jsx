

// const EmployeePage = () => {
//     return (
//         <div>
//             this is employee page
//         </div>
//     );
// }

// export default EmployeePage;

import React from "react";

const EmployeePage = () => {
    const employees = [
        { id: 1, name: "Alice Johnson", role: "Software Engineer", department: "Engineering" },
        { id: 2, name: "Bob Smith", role: "Product Manager", department: "Product" },
        { id: 3, name: "Charlie Brown", role: "Designer", department: "Design" },
        { id: 4, name: "Diana Lee", role: "HR Specialist", department: "HR" },
    ];

    return (
        <div className="p-6">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2 px-3">ID</th>
                        <th className="text-left py-2 px-3">Name</th>
                        <th className="text-left py-2 px-3">Role</th>
                        <th className="text-left py-2 px-3">Department</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">{emp.id}</td>
                            <td className="py-2 px-3">{emp.name}</td>
                            <td className="py-2 px-3">{emp.role}</td>
                            <td className="py-2 px-3">{emp.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeePage;
