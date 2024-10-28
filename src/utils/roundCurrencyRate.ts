export const roundCurrencyRate = (rate: number): string => {
    if (rate < 1) {
        return (1 / rate).toFixed(2);
    }

    return rate.toFixed(2);
};
