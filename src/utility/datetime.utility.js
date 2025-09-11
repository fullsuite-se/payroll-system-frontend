export const convertToISO8601 = (date) => {
    if (!date) return null;

    const d = new Date(date);

    if (isNaN(d)) return null; // invalid date

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

// Converts "YYYY-MM-DD HH:MM:SS" → "YYYY-MM-DDTHH:MM" (for datetime-local input)
export const toDatetimeLocalString = (dateTimeString) => {
    if (!dateTimeString) return '';
    return dateTimeString.slice(0, 16).replace(' ', 'T');
};

// Converts "YYYY-MM-DDTHH:MM" → "YYYY-MM-DD HH:MM:SS" (for backend)
export const toSqlDateTimeString = (inputValue) => {
    if (!inputValue) return '';
    return inputValue.replace('T', ' ') + ':00';
};