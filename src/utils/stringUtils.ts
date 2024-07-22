export const facultyCase = (str: string): string => {
    const TITLE_CASE_FACULTIES = ["FASILKOM", "FPSI", "VOKASI"];
    if (TITLE_CASE_FACULTIES.includes(str.toUpperCase())) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return str.toUpperCase();
}

