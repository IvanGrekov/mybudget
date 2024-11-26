import { EditTransactionCategoryCurrencyDtoCurrencyEnum } from 'types/generated.types';

export const getDefaultCurrency = (
    currency: string,
): EditTransactionCategoryCurrencyDtoCurrencyEnum => {
    const values = Object.values(
        EditTransactionCategoryCurrencyDtoCurrencyEnum,
    );

    return (
        values.find((value) => value === currency) ||
        EditTransactionCategoryCurrencyDtoCurrencyEnum.USD
    );
};
