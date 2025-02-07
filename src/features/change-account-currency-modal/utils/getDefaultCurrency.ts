import { EditAccountCurrencyDtoCurrencyEnum } from 'types/generated.types';

export const getDefaultCurrency = (
    currency: string,
): EditAccountCurrencyDtoCurrencyEnum => {
    const values = Object.values(EditAccountCurrencyDtoCurrencyEnum);

    return (
        values.find((value) => value === currency) ||
        EditAccountCurrencyDtoCurrencyEnum.USD
    );
};
