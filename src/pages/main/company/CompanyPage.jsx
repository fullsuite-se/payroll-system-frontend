import { useCompanyContext } from "../../../contexts/CompanyProvider";
import CompanyDetails from "./CompanyDetails";

const CompanyPage = () => {
    const { companyFullDetail, isCompanyFullDetailLoading } = useCompanyContext();

    if (isCompanyFullDetailLoading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
    );

    return (
        <div className="flex mx-auto px-3 py-2">
            <CompanyDetails company={companyFullDetail} />
        </div>
    );
}

export default CompanyPage;