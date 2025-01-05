import { ICreateTransactionAccount } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { CreateTransactionDtoTypeEnum } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

interface IGetToAccountBalanceAfterTransactionArgs {
    transactionValue: number;
    transactionType: CreateTransactionDtoTypeEnum | null;
    toAccount?: Maybe<ICreateTransactionAccount>;
    transactionFee?: Maybe<number>;
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

    if (transactionType === CreateTransactionDtoTypeEnum.TRANSFER) {
        return toAccount.balance + transactionValue * (currencyRate || 1);
    }

    if (transactionType === CreateTransactionDtoTypeEnum.INCOME) {
        const valueWithoutFee = transactionValue - (transactionFee || 0);

        return toAccount.balance + valueWithoutFee * (currencyRate || 1);
    }

    return null;
};
