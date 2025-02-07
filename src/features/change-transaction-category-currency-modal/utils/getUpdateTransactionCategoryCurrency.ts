import {
    TransactionCategory,
    EditTransactionCategoryCurrencyDtoCurrencyEnum,
} from 'types/generated.types';

type TUpdateTransactionCategoryCurrency = (
    transactionCategory?: TransactionCategory,
) => unknown;

type TGetUpdateTransactionCategoryCurrency = (args: {
    id: number;
    currency: EditTransactionCategoryCurrencyDtoCurrencyEnum;
}) => TUpdateTransactionCategoryCurrency;

export const getUpdateTransactionCategoryCurrency: TGetUpdateTransactionCategoryCurrency =
    ({ id, currency }) => {
        return (transactionCategory) => {
            if (transactionCategory?.id === id) {
                return {
                    ...transactionCategory,
                    currency,
                };
            }

            return transactionCategory;
        };
    };
