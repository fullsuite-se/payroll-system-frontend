import * as XLSX from 'xlsx';


export const normalizeHeader = (header) => {
    return header
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^\w]/g, '');
};

// Helper function to parse Excel date/time values
export const parseExcelDateTime = (value) => {
    if (typeof value === "number") {
        // Convert Excel serial to JS Date
        const excelDate = XLSX.SSF.parse_date_code(value);
        if (excelDate) {
            return new Date(excelDate.y, excelDate.m - 1, excelDate.d, excelDate.H || 0, excelDate.M || 0, excelDate.S || 0);
        }
    } else if (typeof value === "string" && value.trim()) {
        const parsed = new Date(value);
        if (!isNaN(parsed)) {
            return parsed;
        }
    }
    return null;
};

// Helper function to format datetime for backend (YYYY-MM-DD HH:MM:SS)
export const formatDateTime = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Helper function to format date for backend (YYYY-MM-DD)
export const formatDateToISO18601 = (date) => {
    if (!date) return null;
    return date.toISOString().slice(0, 10);
};