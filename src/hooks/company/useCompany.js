import { useEffect, useState } from "react";
import { getCompaniesService } from "../../services/company.service";


const useCompany = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [companies, setCompanies] = useState();
    const [company, setCompany] = useState();
    const [loading, setLoading] = useState(false);

    //fetch company managed by user: select
    useEffect(() => {
        const getCompanies = async () => {
            setLoading(true);

            try {
                const response = await getCompaniesService();
                setCompanies(response.data.companies);
                setCompany(response.data.companies[0]);
            } catch (error) {
                console.log(error);
                setCompanies(null);
                setCompany(null);
            }
            finally {
                setLoading(false);
            }
        };
        getCompanies();
    }, []);

    return {
        dropdownOpen, setDropdownOpen,
        companies, setCompanies,
        company, setCompany,
        loading, setLoading

    };
}

export default useCompany; 