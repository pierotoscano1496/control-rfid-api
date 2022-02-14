function getDateISOString(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateString = `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;

    return dateString;
}

function getTimeString(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeString = `${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`;

    return timeString;
}

function getDateTimeISOString(date) {
    return `${getDateISOString(date)}T${getTimeString(date)}`;
}

module.exports = {
    getDateISOString,
    getTimeString,
    getDateTimeISOString
};