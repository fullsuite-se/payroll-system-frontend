export const convertToISO8601 = (date) => {
    if (!date) return null;

    const d = new Date(date);

    if (isNaN(d)) return null; // invalid date

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};
