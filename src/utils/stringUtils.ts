export const facultyCase = (str: string): string => {
    const TITLE_CASE_FACULTIES = ["FASILKOM", "FPSI", "VOKASI"];
    if (TITLE_CASE_FACULTIES.includes(str.toUpperCase())) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return str.toUpperCase();
}

export const generateAttendanceCode = (): string => {
    const STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#"
    let randomString = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * STRING.length);
        randomString += STRING[randomIndex];
    }

    return randomString;
}

export const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};