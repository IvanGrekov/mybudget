import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { getToAccountBalanceAfterTransaction } from 'features/transaction-form-modal/utils/getToAccountBalanceAfterTransaction';
import {
    AccountTypeEnum,
    CreateTransactionDtoTypeEnum,
} from 'types/generated.types';

interface IValidateFormValuesOnSubmitResult {
    isError: boolean;
    errorMessage?: string;
}

export const validateFormValuesOnSubmit = ({
    type,
    fromAccount,
    toAccount,
    fromCategory,
    value,
    fee,
    currencyRate,
}: TCreateTransactionFormValues): IValidateFormValuesOnSubmitResult => {
    const prevCurrency = fromAccount?.currency || fromCategory?.currency;
    const newCurrency = toAccount?.currency;

    if (
        prevCurrency &&
        newCurrency &&
        prevCurrency !== newCurrency &&
        !currencyRate
    ) {
        return {
            isError: true,
            errorMessage:
                'Currency rate is required if currencies are different',
        };
    }

    if (!type) {
        return {
            isError: true,
            errorMessage: 'Transaction type is required',
        };
    }

    const isIOweAccount = toAccount?.type === AccountTypeEnum.I_OWE;

    if (isIOweAccount) {
        const newToAccountBalance = getToAccountBalanceAfterTransaction({
            transactionValue: value,
            transactionType: type,
            toAccount,
            transactionFee: fee,
            currencyRate,
        });

        if (
            typeof newToAccountBalance === 'number' &&
            newToAccountBalance < 0
        ) {
            return {
                isError: true,
                errorMessage: 'You cannot make over deposit to `I_OWE` account',
            };
        }
    }

    if (CreateTransactionDtoTypeEnum.INCOME === type || isIOweAccount) {
        return {
            isError: false,
        };
    }

    const fromAccountBalance = fromAccount?.balance || 0;

    if (!fromAccountBalance) {
        return {
            isError: true,
            errorMessage:
                'Cannot create a transaction with a zero balance account',
        };
    }

    if (fromAccountBalance < value) {
        return {
            isError: true,
            errorMessage: 'Insufficient funds',
        };
    }

    if (fee && fromAccountBalance < value + fee) {
        return {
            isError: true,
            errorMessage: 'Insufficient funds for the fee',
        };
    }

    return {
        isError: false,
    };
};
