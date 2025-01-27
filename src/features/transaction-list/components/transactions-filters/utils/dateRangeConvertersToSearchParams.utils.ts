export const convertDateFromSearchParamValueToDate = (
    value?: string,
): Date | undefined => {
    if (!value) {
        return undefined;
    }

    return new Date(value);
};

export const convertDateToDateFromSearchParam = (date?: Date): string => {
    if (!date) {
        return '';
    }

    return date.toISOString();
};

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export const convertDateToSearchParamValueToDate = (
    value?: string,
): Date | undefined => {
    if (!value) {
        return undefined;
    }

    const date = new Date(value);
    const result = new Date(date.getTime() - ONE_DAY_IN_MILLISECONDS);

    return result;
};

export const convertDateToDateToSearchParam = (date?: Date): string => {
    if (!date) {
        return '';
    }

    date.setHours(0, 0, 0, 0);
    const result = new Date(date.getTime() + ONE_DAY_IN_MILLISECONDS);

    return result.toISOString();
};
