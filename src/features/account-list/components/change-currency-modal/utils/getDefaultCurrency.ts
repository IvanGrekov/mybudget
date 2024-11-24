import { EditAccountCurrencyDtoCurrencyEnum } from 'types/generated.types';

export const getDefaultCurrency = (
    userCurrency: string,
): EditAccountCurrencyDtoCurrencyEnum => {
    const values = Object.values(EditAccountCurrencyDtoCurrencyEnum);

    return (
        values.find((value) => value === userCurrency) ||
        EditAccountCurrencyDtoCurrencyEnum.USD
    );
};
