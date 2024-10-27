import { EditUserCurrencyDtoDefaultCurrencyEnum } from 'types/generated.types';

export const getDefaultCurrency = (
    userDefaultCurrency: string,
): EditUserCurrencyDtoDefaultCurrencyEnum => {
    const values = Object.values(EditUserCurrencyDtoDefaultCurrencyEnum);

    return (
        values.find((value) => value === userDefaultCurrency) ||
        EditUserCurrencyDtoDefaultCurrencyEnum.USD
    );
};
