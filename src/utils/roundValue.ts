import { Maybe } from 'types/utility.types';

export const roundValue = (value?: Maybe<number>): string => {
    if (typeof value !== 'number' || value === 0) {
        return '0';
    }

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};
