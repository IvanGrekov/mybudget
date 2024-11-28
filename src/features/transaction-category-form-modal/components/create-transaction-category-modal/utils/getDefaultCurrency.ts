import { CreateTransactionCategoryDtoCurrencyEnum } from 'types/generated.types';

export const getDefaultCurrency = (
    userCurrency: string,
): CreateTransactionCategoryDtoCurrencyEnum => {
    const values = Object.values(CreateTransactionCategoryDtoCurrencyEnum);

    return (
        values.find((value) => value === userCurrency) ||
        CreateTransactionCategoryDtoCurrencyEnum.USD
    );
};
