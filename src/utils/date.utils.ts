import { format } from 'date-fns';

const DATE_FORMAT = 'dd MMMM yyyy';
const TIME_FORMAT = 'HH:mm';

export const getDateTime = (date: string): string => {
    return format(new Date(date), `${DATE_FORMAT} ${TIME_FORMAT}`);
};

export const getTime = (date: string): string => {
    return format(new Date(date), TIME_FORMAT);
};

export const getDate = (date: string): string => {
    return format(new Date(date), DATE_FORMAT);
};
