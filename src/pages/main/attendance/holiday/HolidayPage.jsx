import { useHolidayContext } from "../../../../contexts/HolidayProvider";
import AttendanceList from "./AttendanceList";
import Filter from "./Filter";
import HolidayForm from "./HolidayForm";
import HolidayList from "./HolidayList";
import HolidayModal from "./HolidayModal";
import UpdateHolidayForm from "./UpdateHolidayForm";

const HolidayPage = () => {
    const {
        handleShowAddHolidayModal,
        handleShowUpdateHolidayModal, // Added this
        showAddHoliday,
        showUpdateHoliday, // Added this
        attendancesLoading,
        attendances
    } = useHolidayContext();

    return (
        <>
            <div className="w-full max-w-full">
                {/* Top Filter */}
                <div className="pb-6">
                    <Filter onClickAdd={handleShowAddHolidayModal} />
                </div>

                {/* Main Content */}
                <div className="flex gap-6">
                    {/* Holidays List */}
                    <div className="w-1/2">
                        <div className="text-sm font-semibold text-gray-700">Holiday</div>
                        <HolidayList />
                    </div>

                    {/* Employees Attended Placeholder */}
                    <div className="w-2/3 flex flex-col">
                        <div className="text-sm font-semibold text-gray-700">Employees on Selected Holiday</div>
                        {
                            attendancesLoading
                                ? <div className="w-full p-4 flex items-center justify-center text-gray-500">
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </div>
                                </div>
                                :
                                <>
                                    {attendances.length === 0
                                        ? <div className="w-full p-4 flex items-center justify-center text-gray-500">
                                            <p>No employees to display. Select a holiday to see attendees.</p>
                                        </div>
                                        : <AttendanceList attendances={attendances} />
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>

            {/* Add Holiday Modal */}
            {showAddHoliday && (
                <HolidayModal
                    title="Add Holiday"
                    description="Fill in the details to add a new holiday"
                    onClose={handleShowAddHolidayModal}
                >
                    <HolidayForm />
                </HolidayModal>
            )}

            {/* Update Holiday Modal - Fixed: Now uses separate state */}
            {showUpdateHoliday && (
                <HolidayModal
                    title="Update Holiday"
                    description="Fill in the details to update the holiday"
                    onClose={handleShowUpdateHolidayModal} // Changed handler
                >
                    <UpdateHolidayForm />
                </HolidayModal>
            )}
        </>
    );
};

export default HolidayPage;