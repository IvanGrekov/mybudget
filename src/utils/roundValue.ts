export const roundValue = (rate: number): string => {
    if (rate === 0) {
        return '0';
    }

    return rate.toFixed(2);
};
