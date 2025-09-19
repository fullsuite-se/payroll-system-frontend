import AddModal from "../../../../components/AddModal";
import DailyRecordFilter from "../../../../components/DailyRecordFilter";
import DualBallLoading from "../../../../components/DualBallLoading";
import TanStackTable from "../../../../components/TanStackTable"; // Added missing import
import { useRecurringPayContext } from "../../../../contexts/RecurringPayProvider";
import RecurringPayForm from "./RecurringPayForm";
import { column } from "./TableConfigs";

const RecurringPayPage = () => {
    const {
        recurringPaysLoading,
        recurringPays,
        handleRowClick,
        handleDeleteOneRecurringPay,
        showRecurringPayModal,
        handleShowRecurringPayModal,
        uploadRecurringPayFile,
        isUploading,

        //filter
        filters,
        handleResetFilter, handleFilterChange,
    } = useRecurringPayContext();

    return (
        <>
            <div className="w-full max-w-full">
                <div className="pb-4">
                    <DailyRecordFilter
                        onClickAdd={handleShowRecurringPayModal}
                        filters={filters}
                        resetFilter={handleResetFilter}
                        onChangeFilter={handleFilterChange}
                    />
                </div>
                <div className="w-full">
                    {
                        recurringPaysLoading
                            ? <DualBallLoading />
                            : <TanStackTable
                                data={recurringPays}
                                columns={column}
                                onRowClick={handleRowClick}
                                onDelete={handleDeleteOneRecurringPay}
                            />
                    }
                </div>
            </div>

            {
                showRecurringPayModal &&
                <AddModal
                    title="Add Recurring Pay"
                    description="Recurring pay will be included in the payrun, depending on employment status."
                    onClose={handleShowRecurringPayModal}
                    uploadFile={uploadRecurringPayFile}
                    isUploading={isUploading}
                >
                    <RecurringPayForm />
                </AddModal>
            }
        </>
    );
};

export default RecurringPayPage;