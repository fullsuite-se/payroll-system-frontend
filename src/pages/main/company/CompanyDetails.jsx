import {
    EnvelopeIcon,
    CalendarDaysIcon,
    ClockIcon,
    IdentificationIcon,
    MapPinIcon,
    PhoneIcon,
    DocumentTextIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const CompanyDetails = ({ company }) => {
    const { companies_info } = company;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                    <img
                        src={company.company_logo}
                        alt={company.company_name}
                        className="w-20 h-20 rounded-xl object-cover"
                    />
                </div>

                {/* Company Details */}
                <div className="flex-grow">
                    <h1 className="text-xl font-semibold text-gray-900 mb-1">
                        {company.company_name}
                    </h1>

                    {company.company_trade_name && (
                        <p className="text-sm text-gray-500 mb-4">
                            Trading as <span className="font-medium">{company.company_trade_name}</span>
                        </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                            <span>{company.company_email}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <IdentificationIcon className="h-4 w-4 text-gray-400" />
                            <span>ID: {company.company_id}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                            <span>{new Date(company.created_at).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-gray-400" />
                            <span>{new Date(company.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* company infos */}
                {/* <div className="grid grid-cols-2 border-l border-gray-300 px-4 ">
                    <div className="flex items-start gap-4">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-gray-500 text-sm">Address</p>
                            <p className="text-gray-700 text-xs">{companies_info.company_address}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-gray-500 text-sm">Phone</p>
                            <p className="text-gray-700 text-xs">{companies_info.company_phone}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-gray-500 text-sm">Tax ID Number</p>
                            <p className="text-gray-700 text-xs">{companies_info.company_tin}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <BuildingLibraryIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-gray-500 text-sm">Business Type</p>
                            <p className="text-gray-700 text-xs">{companies_info.business_type}</p>
                        </div>
                    </div>
                </div> */}

                {/* company infos */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-l border-gray-300 px-6 py-4">
                    <div className="flex items-start gap-3">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-gray-500 text-sm">Address</p>
                            <p className="text-gray-700 text-xs">{companies_info.company_address}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-gray-500 text-sm">Phone</p>
                            <p className="text-gray-700 text-xs">{companies_info.company_phone}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-gray-500 text-sm">Tax ID Number</p>
                            <p className="text-gray-700 text-xs">{companies_info.company_tin}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <BuildingLibraryIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-gray-500 text-sm">Business Type</p>
                            <p className="text-gray-700 text-xs">{companies_info.business_type}</p>
                        </div>
                    </div>
                </div>

            </div>




        </div>
    );
};

export default CompanyDetails;
