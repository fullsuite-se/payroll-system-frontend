import { useEffect, useState, useCallback } from "react";
import {
    createCompany,
    createUserToManageCompany,
    getCompaniesService,
} from "../services/company.service";
import { useToastContext } from "../contexts/ToastProvider";

const initialFormData = {
    company_id: "",
    company_name: "",
    company_trade_name: "",
    company_email: "",
    company_logo: "",

    company_address: "",
    company_phone: "",
    company_tin: "",
    business_type: "",

    editors: [], // {first_name, last_name, user_id}
    approvers: [], // {first_name, last_name, user_id}
};

const convertToStringIds = (editors, approvers) => {
    const editorIds = editors.map((e) => e.user_id);
    const approverIds = approvers.map((a) => a.user_id);
    return [...editorIds, ...approverIds].join(",");
};

const useCompany = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
    const [isAddCompanyLoading, setIsAddCompanyLoading] = useState(false);
    const [companyFormData, setCompanyFormData] = useState(initialFormData);

    const { addToast } = useToastContext();

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                const response = await getCompaniesService();
                const fetchedCompanies = response?.data?.companies ?? [];
                setCompanies(fetchedCompanies);

                // Get last selected company_id from localStorage
                const savedCompanyId = localStorage.getItem("selected_company_id");

                let selected = null;
                if (savedCompanyId) {
                    selected = fetchedCompanies.find(
                        (c) => c.company_id === savedCompanyId
                    );
                }

                // fallback: if no saved company OR not found in fetched list
                if (!selected && fetchedCompanies.length > 0) {
                    selected = fetchedCompanies[0];
                }

                setCompany(selected ?? null);
            } catch (error) {
                console.error("Failed to fetch companies:", error);
                setCompanies([]);
                setCompany(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const changeSelectedCompany = useCallback((selected) => {
        setCompany(selected);
        localStorage.setItem("selected_company_id", selected?.company_id || "");
        setDropdownOpen(false);
    }, []);

    const handleShowAddCompanyModal = () => {
        setIsAddCompanyModalOpen(true);
        setDropdownOpen(false);
    }


    const handleCreateCompany = useCallback(
        async (e) => {
            e.preventDefault();

            if (
                companyFormData.approvers.length === 0 ||
                companyFormData.editors.length === 0
            ) {
                addToast("Select approvers/editors from the selection", "warning");
                return;
            }

            setIsAddCompanyLoading(true);

            try {
                // 1. Create company
                await createCompany(companyFormData);

                // 2. Assign managers
                let userIds = convertToStringIds(
                    companyFormData.editors,
                    companyFormData.approvers
                );
                userIds = `${userIds},${localStorage.getItem("system_user_id")}`;
                await createUserToManageCompany(userIds, companyFormData.company_id);

                // 3. Construct new company
                const newCompany = {
                    company_id: companyFormData.company_id,
                    company_name: companyFormData.company_name,
                    company_trade_name: companyFormData.company_trade_name,
                    company_email: companyFormData.company_email,
                    company_logo: companyFormData.company_logo,
                };

                setCompanies((prev) => [...prev, newCompany]);
                setCompany(newCompany);
                setIsAddCompanyModalOpen(false);

                addToast("New Company Created", "success");
            } catch (error) {
                console.error("Company creation failed:", error);
                const message =
                    error?.response?.data?.message || "Failed to create company.";
                addToast(message, "error");
            } finally {
                setIsAddCompanyLoading(false);
            }
        },
        [companyFormData, addToast]
    );

    // add user to editors
    const addEditor = (user) => {
        if (!companyFormData.editors.some((u) => u.user_id === user.user_id)) {
            setCompanyFormData({
                ...companyFormData,
                editors: [...companyFormData.editors, user],
            });
        }
    };

    // add user to approvers
    const addApprover = (user) => {
        if (!companyFormData.approvers.some((u) => u.user_id === user.user_id)) {
            setCompanyFormData({
                ...companyFormData,
                approvers: [...companyFormData.approvers, user],
            });
        }
    };

    // remove user from editors/approvers
    const removeUser = (type, id) => {
        setCompanyFormData({
            ...companyFormData,
            [type]: companyFormData[type].filter((u) => u.user_id !== id),
        });
    };

    return {
        dropdownOpen,
        setDropdownOpen,
        companies,
        setCompanies,
        company,
        setCompany,
        loading,
        changeSelectedCompany,
        isAddCompanyModalOpen,
        setIsAddCompanyModalOpen,
        companyFormData,
        setCompanyFormData,
        handleCreateCompany,
        isAddCompanyLoading,
        setIsAddCompanyLoading,
        addEditor,
        addApprover,
        removeUser,
        handleShowAddCompanyModal
    };
};

export default useCompany;
