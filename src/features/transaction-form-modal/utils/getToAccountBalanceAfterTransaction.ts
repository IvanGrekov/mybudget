import { ICreateTransactionAccount } from 'features/transaction-form-modal/types/createTransactionFormValues';
import {
    CreateTransactionDtoTypeEnum,
    AccountTypeEnum,
} from 'types/generated.types';
import { Maybe } from 'types/utility.types';

interface IGetToAccountBalanceAfterTransactionArgs {
    transactionValue: number | string;
    transactionType: CreateTransactionDtoTypeEnum | null;
    toAccount?: Maybe<ICreateTransactionAccount>;
    transactionFee?: Maybe<number | string>;
    currencyRate?: Maybe<number>;
}

export const getToAccountBalanceAfterTransaction = ({
    transactionValue,
    transactionType,
    toAccount,
    transactionFee,
    currencyRate,
}: IGetToAccountBalanceAfterTransactionArgs): number | null => {
    if (!transactionValue || !transactionType || !toAccount) {
        return null;
    }

    const numberedValue =
        typeof transactionValue === 'number'
            ? transactionValue
            : parseFloat(transactionValue);
    const numberedFee =
        typeof transactionFee === 'number'
            ? transactionFee
            : parseFloat(transactionFee || '0');

    if (toAccount.type === AccountTypeEnum.I_OWE) {
        const value =
            transactionType === CreateTransactionDtoTypeEnum.INCOME
                ? numberedValue + numberedFee
                : numberedValue;

        return toAccount.balance - value * (currencyRate || 1);
    }

    if (transactionType === CreateTransactionDtoTypeEnum.TRANSFER) {
        return toAccount.balance + numberedValue * (currencyRate || 1);
    }

    if (transactionType === CreateTransactionDtoTypeEnum.INCOME) {
        const value = (numberedValue - numberedFee) * (currencyRate || 1);

        return toAccount.balance + value;
    }

    return null;
};
