import { convertToISO8601 } from "../../../../utility/datetime.utility";

export const column = [
    {
        accessorKey: "employee_id",
        header: "Employee ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "overtime_date",
        header: "Overtime Date",
        cell: (info) => convertToISO8601(info.getValue()),
    },
    {
        accessorKey: "overtime_type",
        header: "OT Type",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "overtime_hours_rendered",
        header: "Hours Rendered",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "overtime_night_differential",
        header: "Overtime ND",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "overtime_status",
        header: "Status",
        cell: (info) => info.getValue(),
    },
];