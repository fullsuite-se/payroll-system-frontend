import Question1Img from "../../../../public/question1.svg";
import Question from "../../../components/Question";
import { useCompanyContext } from "../../../contexts/CompanyProvider";


const DashboardPage = () => {
    const { company, loading, handleShowAddCompanyModal } = useCompanyContext();

    if (loading) return <div>Loading</div>

    if (!company) return <Question
        title="No Company Found"
        label="Create to start runing payroll for your organization"
        onStartFunction={handleShowAddCompanyModal}
        buttonLabel="Create Company"
    />;

    return (
        <div>
            this is dashboard page
        </div>
    );
}

export default DashboardPage;