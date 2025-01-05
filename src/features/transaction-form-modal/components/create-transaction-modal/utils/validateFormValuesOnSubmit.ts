import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { CreateTransactionDtoTypeEnum } from 'types/generated.types';

interface IValidateFormValuesOnSubmitResult {
    isError: boolean;
    errorMessage?: string;
}

export const validateFormValuesOnSubmit = ({
    type,
    fromAccount,
    toAccount,
    toCategory,
    fromCategory,
    value,
    fee,
    currencyRate,
}: TCreateTransactionFormValues): IValidateFormValuesOnSubmitResult => {
    const prevCurrency = fromAccount?.currency || fromCategory?.currency;
    const newCurrency = toAccount?.currency || toCategory?.currency;

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

    const fromAccountBalance = fromAccount?.balance || 0;

    if (CreateTransactionDtoTypeEnum.INCOME === type) {
        return {
            isError: false,
        };
    }

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
