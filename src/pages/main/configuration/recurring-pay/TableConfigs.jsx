import { convertToISO8601 } from "../../../../utility/datetime.utility";

export const column = [
    {
        accessorKey: "employee_id",
        header: "Employee ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "payitem_id",
        header: "Payitem",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "date_start",
        header: "Start",
        cell: (info) => convertToISO8601(info.getValue()),
    },
    {
        accessorKey: "date_end",
        header: "End",
        cell: (info) => convertToISO8601(info.getValue()),
    },

];