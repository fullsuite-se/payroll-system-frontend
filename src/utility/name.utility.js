export const generateInitials = (first_name, last_name) => {
    const f = first_name[0].toUpperCase();
    const l = last_name[0].toUpperCase();
    return `${f}${l}`;
}