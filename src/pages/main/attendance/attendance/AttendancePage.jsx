import AddModal from "../../../../components/AddModal";
import DailyRecordFilter from "../../../../components/DailyRecordFilter";
import TanStackTable from "../../../../components/TanStackTable";
import { useAttendanceContext } from "../../../../contexts/AttendanceProvider";
import AttendanceForm from "./AttendanceForm";
import { column } from "./TableConfigs";

const AttendancePage = () => {
    const { attendances, isAttendancesLoading, handleRowClick, handleShowAttendanceModal, showAttendanceModal, isUploading, uploadAttendanceFile } = useAttendanceContext();

    if (isAttendancesLoading) return <div>Loading ...</div>;

    return (
        <>
            <div className="w-full max-w-full">
                <div className="pb-4">
                    <DailyRecordFilter
                        onClickAdd={handleShowAttendanceModal}
                    />
                </div>
                <div className="w-full">
                    <TanStackTable
                        data={attendances}
                        columns={column}
                        onRowClick={handleRowClick}
                    />
                </div>
            </div>
            {showAttendanceModal
                && <AddModal
                    title="Add Attendance"
                    description="Attendances will be included in the payrun, depending on employment status."
                    onClose={handleShowAttendanceModal}
                    uploadFile={uploadAttendanceFile}
                    isUploading={isUploading}
                >
                    <AttendanceForm />
                </AddModal>
            }
        </>
    );
};

export default AttendancePage;