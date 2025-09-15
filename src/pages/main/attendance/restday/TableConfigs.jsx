import { convertToISO8601 } from "../../../../utility/datetime.utility";

export const column = [
    {
        accessorKey: "employee_id",
        header: "Employee ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "restday_date",
        header: "Date",
        cell: (info) => convertToISO8601(info.getValue()),
    },
    {
        accessorKey: "time_in",
        header: "Time In",
        cell: (info) => convertToISO8601(info.getValue()),
    },
    {
        accessorKey: "time_out",
        header: "Time Out",
        cell: (info) => convertToISO8601(info.getValue()),
    },
    {
        accessorKey: "hours_rendered", //regular shift plus overtimes
        header: "Hours Rendered",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "hours_worked", //regular shift
        header: "Hours Worked",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "undertime", //hours not completed
        header: "Undertime",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "tardiness", //minutes late
        header: "Tardiness",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "night_differential", //hours fall between 10:pm to 6:am
        header: "Night Differential",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "shift_type",
        header: "Shift Type",
        cell: (info) => (
            <span className={`inline-block px-2 py-1 text-xs rounded-full 
                ${info.getValue() == "REGULAR" ? "bg-teal-100 text-teal-700" : "bg-orange-100 text-orange-700"
                }`}>
                {info.getValue() == "REGULAR" ? "Regular" : "Slide"}
            </span>
        ),
    },
];