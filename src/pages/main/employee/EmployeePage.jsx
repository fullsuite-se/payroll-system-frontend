// export default EmployeePage;
import Search from "../../../components/Search";
import { useEmployeeContext } from "../../../contexts/EmployeeProvider";
import EmployeeCard from "./EmployeeCard";
import EmployeeTable from "./EmployeeTable";

const EmployeePage = () => {
    const { query, setQuery, employee, setEmployee } = useEmployeeContext();

    return (
        <div>
            <div className="flex justify-between pb-4">
                <Search query={query} setQuery={setQuery} />
                <button className="bg-teal-600 text-sm px-3 py-1 text-white rounded-2xl cursor-pointer">
                    Add +
                </button>
            </div>

            <div className="flex gap-4">
                {/* Table container - adjusts width based on whether card is open */}
                <div className={`transition-all duration-300 ${employee ? 'w-2/3' : 'w-full'
                    }`}>
                    <EmployeeTable isCardOpen={!!employee} />
                </div>

                {/* Employee Card - slides in from right when opened */}
                {employee && (
                    <div className="w-1/3 min-w-[350px]">
                        <EmployeeCard employee={employee} setEmployee={setEmployee} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeePage;