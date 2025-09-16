// import { useHolidayContext } from "../../../../contexts/HolidayProvider";
// import Filter from "./Filter";
// import HolidayForm from "./HolidayForm";
// import HolidayList from "./HolidayList";
// import HolidayModal from "./HolidayModal";

// const HolidayPage = () => {
//     const { handleShowAddHolidayModal, showAddHoliday } = useHolidayContext();

//     return (
//         <>
//             <div className="w-full max-w-full">
//                 <div className="pb-6">
//                     <Filter onClickAdd={handleShowAddHolidayModal} />
//                 </div>

//                 <div className="flex">
//                     <div className="flex flex-1/3">
//                         <HolidayList />
//                     </div>

//                     <div className="flex w-full">

//                     </div>

//                 </div>

//             </div>

//             {showAddHoliday && (
//                 <HolidayModal
//                     title="Add Holiday"
//                     description="Fill in the details to add a new holiday"
//                     onClose={handleShowAddHolidayModal}
//                 >
//                     <HolidayForm />
//                 </HolidayModal>
//             )}
//         </>
//     );
// };

// export default HolidayPage;

import { useHolidayContext } from "../../../../contexts/HolidayProvider";
import Filter from "./Filter";
import HolidayForm from "./HolidayForm";
import HolidayList from "./HolidayList";
import HolidayModal from "./HolidayModal";

const HolidayPage = () => {
    const { handleShowAddHolidayModal, showAddHoliday } = useHolidayContext();

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
                        <HolidayList />
                    </div>

                    {/* Employees Attended Placeholder */}
                    <div className="w-2/3 bg-white rounded-lg shadow-sm p-4 flex items-center justify-center text-gray-500">
                        <p>No employees to display. Select a holiday to see attendees.</p>
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
        </>
    );
};

export default HolidayPage;
