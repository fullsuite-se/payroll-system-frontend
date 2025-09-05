import { useCompanyContext } from "../contexts/CompanyProvider";
import Input from "./Input.component";

const EditCompanyForm = () => {
    const {
        companyUpdateFormData,
        setCompanyUpdateFormData,
        isEditCompanyLoading,
        handleUpdateCompany,
        setIsEditCompany,
    } = useCompanyContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateCompany();
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                        label="Company ID"
                        name="company_id"
                        value={companyUpdateFormData.company_id}
                        onChange={handleChange}
                        readOnly
                    />
                    <Input
                        label="Company Name"
                        name="company_name"
                        value={companyUpdateFormData.company_name}
                        onChange={handleChange}
                    />
                    <Input
                        label="Company Trade Name"
                        name="company_trade_name"
                        value={companyUpdateFormData.company_trade_name}
                        onChange={handleChange}
                    />
                    <Input
                        label="Company Email"
                        name="company_email"
                        value={companyUpdateFormData.company_email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Company Logo"
                        name="company_logo"
                        value={companyUpdateFormData.company_logo}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-end space-x-3 text-sm">
                    <button
                        type="button"
                        onClick={() => setIsEditCompany(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isEditCompanyLoading}
                        className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 transition"
                    >
                        {isEditCompanyLoading ? "Loading..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCompanyForm;

