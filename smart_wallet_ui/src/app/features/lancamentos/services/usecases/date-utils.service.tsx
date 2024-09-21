export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0, por isso somamos 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;
}

export function formatDateTimeFimDia(date: Date, fimDia: boolean): string {
    if (fimDia) {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
    }
    
    return formatDateTime(date);
}
