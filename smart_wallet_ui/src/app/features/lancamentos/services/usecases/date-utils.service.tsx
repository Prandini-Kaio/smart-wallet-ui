export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0, por isso somamos 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatDateTime(date: Date, fimDia: boolean): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0, por isso somamos 1
    const day = String(date.getDate()).padStart(2, '0');
    return fimDia ? `${year}-${month}-${day}T23:59:59` : `${year}-${month}-${day}T00:00:00`;
}