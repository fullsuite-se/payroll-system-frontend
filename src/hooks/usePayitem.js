import { useEffect, useState } from "react";
import { useCompanyContext } from "../contexts/CompanyProvider";
import { useToastContext } from "../contexts/ToastProvider";
import { fetchPayitems } from "../services/payitem.service";

const usePayitem = () => {
    const [payitems, setPayitems] = useState([]);
    const [payitemsLoading, setPayitemsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [filteredPayitems, setFilteredPayitems] = useState([]); //this is for display of payitems list

    const { company } = useCompanyContext();
    const { addToast } = useToastContext();

    //pay-items are same for all company
    const handleFetchPayitems = async () => {
        setPayitemsLoading(true);

        try {
            const result = await fetchPayitems();
            console.log('payitems: ', result);
            setPayitems(result.data.payitems);
            setFilteredPayitems(result.data.payitems);
        } catch (error) {
            console.log(error);
            addToast("Failed to fetch payitems", "error");
        }
        finally {
            setPayitemsLoading(true);
        }
    };

    useEffect(() => {
        if (!company) return;
        handleFetchPayitems();
    }, [company]);

    //change the filtered payitems based on query
    useEffect(() => {
        if (!company) return;
        setFilteredPayitems(payitems.filter(item => item.payitem_name.toLowerCase().includes(query.toLowerCase())));
    }, [query]);

    return {
        payitems, setPayitems,
        payitemsLoading, setPayitemsLoading,
        handleFetchPayitems,
        query, setQuery,
        filteredPayitems, setFilteredPayitems,

    }
};

export default usePayitem;