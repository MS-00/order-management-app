export function getDay2Digits(date: Date) {
    let d = date.getDate();

    return ("0" + d).slice(-2);
}

export function getMonth2Digits(date: Date) {
    let m = date.getMonth() + 1;

    return ("0" + m).slice(-2);
}

/**
 *
 * @param date
 * @returns string -> yyyy-mm-dd
 */
export function formatToString(date: Date) {
    return `${date.getFullYear()}-${getMonth2Digits(date)}-${getDay2Digits(
        date
    )}`;
}

/**
 *
 * @param date
 * @param year
 * @returns string -> yy/mm/dd
 */
export function formatToStringUI(date: Date, year: boolean = true) {
    let yearS = "";

    if (year) {
        yearS = `/${date.getFullYear()}`;
    }

    return `${getDay2Digits(date)}/${getMonth2Digits(date)}${yearS}`;
}
