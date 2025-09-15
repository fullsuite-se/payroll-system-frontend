import AddModal from "../../../../components/AddModal";
import DailyRecordFilter from "../../../../components/DailyRecordFilter";
import TanStackTable from "../../../../components/TanStackTable";
import { useAbsenceContext } from "../../../../contexts/AbsenceProvider";
import AbsenceForm from "./AbsenceForm";
import { column } from "./TableConfigs";

const AbsencePage = () => {
    const {
        handleShowAbsenceModal,
        absences,
        handleRowClick,
        handleDeleteAbsence,
        showAbsenceModal,
        uploadAbsenceFile,
        isUploading
    } = useAbsenceContext();

    return (
        <>
            <div className="w-full max-w-full">
                <div className="pb-4">
                    <DailyRecordFilter onClickAdd={handleShowAbsenceModal} />
                </div>
                <div className="w-full">
                    <TanStackTable
                        data={absences}
                        columns={column}
                        onRowClick={handleRowClick}
                        onDelete={handleDeleteAbsence}
                    />
                </div>
            </div>
            {showAbsenceModal && (
                <AddModal
                    title="Add Absences"
                    description="Absences will be included in the payrun, depending on employment status."
                    onClose={handleShowAbsenceModal}
                    uploadFile={uploadAbsenceFile}
                    isUploading={isUploading}
                >
                    <AbsenceForm />
                </AddModal>
            )}
        </>
    );
};

export default AbsencePage;