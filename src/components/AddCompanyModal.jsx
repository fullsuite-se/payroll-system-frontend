import CompanyForm from "./CompanyForm";

const AddCompanyModal = () => {


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/20 px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create Company
                    </h2>
                    <p className="text-sm text-gray-500">
                        This company will be managed by you. Select the approver of the payruns
                    </p>
                </div>

                {/* Form Fiedls */}
                <CompanyForm />
            </div>
        </div>
    );
}
export default AddCompanyModal;

