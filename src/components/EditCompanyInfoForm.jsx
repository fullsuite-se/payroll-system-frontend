import { useCompanyContext } from "../contexts/CompanyProvider";
import Input from "./Input.component";

const EditCompanyInfoForm = () => {
    const {
        companyUpdateFormData,
        handleUpdateCompanyInfo,
        isEditCompanyInfoLoading,
        setCompanyUpdateFormData,
        setIsEditCompanyInfo,
    } = useCompanyContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateCompanyInfo();
    };

    const handleChange = (e) => {
        setCompanyUpdateFormData({
            ...companyUpdateFormData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Company Address"
                        name="company_address"
                        value={companyUpdateFormData.company_address}
                        onChange={handleChange}
                    />
                    <Input
                        label="Company Phone"
                        name="company_phone"
                        value={companyUpdateFormData.company_phone}
                        onChange={handleChange}
                    />
                    <Input
                        label="Company Tin"
                        name="company_tin"
                        value={companyUpdateFormData.company_tin}
                        onChange={handleChange}
                    />
                    <Input
                        label="Business Type"
                        name="business_type"
                        value={companyUpdateFormData.business_type}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-end space-x-3 text-sm">
                    <button
                        type="button"
                        onClick={() => setIsEditCompanyInfo(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isEditCompanyInfoLoading}
                        className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 transition"
                    >
                        {isEditCompanyInfoLoading ? "Loading..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCompanyInfoForm;

