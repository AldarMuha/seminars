export const formatDateToServer = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`; // Возвращает дату в формате DD.MM.YYYY
};

export const formatDateFromServer = (dateString) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`; // Возвращает дату в формате YYYY-MM-DD
};