import { ICreateTransactionAccount } from 'features/transaction-form-modal/types/createTransactionFormValues';
import {
    AccountTypeEnum,
    CreateTransactionDtoTypeEnum,
} from 'types/generated.types';
import { Maybe } from 'types/utility.types';

interface IGetFromAccountBalanceAfterTransactionArgs {
    transactionValue: number | string;
    transactionType: CreateTransactionDtoTypeEnum | null;
    fromAccount?: Maybe<ICreateTransactionAccount>;
    transactionFee?: Maybe<number | string>;
}

export const getFromAccountBalanceAfterTransaction = ({
    transactionValue,
    transactionType,
    fromAccount,
    transactionFee,
}: IGetFromAccountBalanceAfterTransactionArgs): number | null => {
    if (!transactionValue || !transactionType || !fromAccount) {
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

    if (
        [
            CreateTransactionDtoTypeEnum.BALANCE_CORRECTION,
            CreateTransactionDtoTypeEnum.INCOME,
        ].includes(transactionType)
    ) {
        return null;
    }

    if (fromAccount.type === AccountTypeEnum.I_OWE) {
        return fromAccount.balance + numberedValue + numberedFee;
    }

    return fromAccount.balance - numberedValue - numberedFee;
};
