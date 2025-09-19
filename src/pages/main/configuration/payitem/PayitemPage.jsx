import Search from "../../../../components/Search";
import { usePayitemContext } from "../../../../contexts/PayitemProvider";
import PayitemTable from "./PayitemTable";

const PayitemPage = () => {
    const { query, setQuery, } = usePayitemContext();

    return (
        <>
            <div className="flex pb-4">
                <Search query={query} setQuery={setQuery} />
            </div>
            <PayitemTable />
        </>
    )
};

export default PayitemPage;