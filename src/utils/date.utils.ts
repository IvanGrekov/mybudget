import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import { Maybe } from 'types/utility.types';

const DATE_FORMAT = 'dd MMMM yyyy';
const TIME_FORMAT = 'HH:mm';

export const getDateTime = (
    dateInput: string,
    timeZone?: Maybe<string>,
): string => {
    const date = new Date(dateInput);

    if (timeZone) {
        return formatInTimeZone(
            date,
            timeZone,
            `${DATE_FORMAT} ${TIME_FORMAT}`,
        );
    }

    return format(date, `${DATE_FORMAT} ${TIME_FORMAT}`);
};

export const getTime = (
    dateInput: string,
    timeZone?: Maybe<string>,
): string => {
    const date = new Date(dateInput);

    if (timeZone) {
        return formatInTimeZone(date, timeZone, TIME_FORMAT);
    }

    return format(date, TIME_FORMAT);
};

export const getDate = (
    dateInput: string | Date,
    timeZone?: Maybe<string>,
): string => {
    const date =
        typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (timeZone) {
        return formatInTimeZone(date, timeZone, DATE_FORMAT);
    }

    return format(date, DATE_FORMAT);
};
