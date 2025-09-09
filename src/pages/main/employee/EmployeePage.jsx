// export default EmployeePage;
import Search from "../../../components/Search";
import { useEmployeeContext } from "../../../contexts/EmployeeProvider";
import AddEmployeeModal from "./AddEmployeeModal";
import EmployeeCard from "./EmployeeCard";
import EmployeeTable from "./EmployeeTable";

const EmployeePage = () => {
    const { query, setQuery, employee, setEmployee, handleShowAddModal, showAddModal, showAddSalaryForm, setShowAddSalaryForm, } = useEmployeeContext();

    return (
        <>
            <div>
                <div className="flex justify-between pb-4">
                    <Search query={query} setQuery={setQuery} />
                    <button
                        onClick={() => handleShowAddModal(true)}
                        className="bg-teal-600 text-sm px-3 py-1 text-white rounded-2xl cursor-pointer hover:bg-teal-700"
                    >
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
                            <EmployeeCard
                                employee={employee}
                                setEmployee={setEmployee}
                                setShowAddSalaryForm={setShowAddSalaryForm}
                                showAddSalaryForm={showAddSalaryForm}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showAddModal && <AddEmployeeModal onClose={() => handleShowAddModal(false)} />}
        </>
    );
};

export default EmployeePage;