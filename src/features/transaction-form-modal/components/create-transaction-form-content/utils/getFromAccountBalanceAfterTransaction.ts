import { ICreateTransactionAccount } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { CreateTransactionDtoTypeEnum } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

interface IGetFromAccountBalanceAfterTransactionArgs {
    transactionValue: number;
    transactionType: CreateTransactionDtoTypeEnum | null;
    fromAccount?: Maybe<ICreateTransactionAccount>;
    transactionFee?: Maybe<number>;
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

    if (
        [
            CreateTransactionDtoTypeEnum.TRANSFER,
            CreateTransactionDtoTypeEnum.EXPENSE,
        ].includes(transactionType)
    ) {
        return fromAccount.balance - transactionValue - (transactionFee || 0);
    }

    return null;
};
