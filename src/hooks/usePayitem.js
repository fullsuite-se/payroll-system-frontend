import { useEffect, useState } from "react";
import { useCompanyContext } from "../contexts/CompanyProvider";
import { useToastContext } from "../contexts/ToastProvider";
import { fetchPayitems } from "../services/payitem.service";

const usePayitem = () => {
    const [payitems, setPayitems] = useState([]);
    const [payitemsLoading, setPayitemsLoading] = useState(false);

    const { company } = useCompanyContext();
    const { addToast } = useToastContext();

    //pay-items are same for all company
    const handleFetchPayitems = async () => {
        setPayitemsLoading(true);

        try {
            const result = await fetchPayitems();
            setPayitems(result.data.payitems);
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
    }, [company])

    return {
        payitems, setPayitems,
        payitemsLoading, setPayitemsLoading,
        handleFetchPayitems
    }
};

export default usePayitem;