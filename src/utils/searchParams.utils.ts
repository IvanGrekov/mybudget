export const combineMultipleValuesSearchParam = (items: string[]): string => {
    return items.join(',');
};

export const splitMultipleValuesSearchParam = (value: string): string[] => {
    return value.split(',');
};
