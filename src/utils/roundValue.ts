import { Maybe } from 'types/utility.types';

export const roundValue = (value?: Maybe<number>): number => {
    if (typeof value !== 'number') {
        return 0;
    }

    if (value === 0) {
        return value;
    }

    return +value.toFixed(2);
};
