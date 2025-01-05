import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';

type TGetShouldShowCurrencyRateField = (
    args: Pick<
        TCreateTransactionFormValues,
        'fromAccount' | 'toAccount' | 'fromCategory' | 'toCategory'
    >,
) => boolean;

export const getShouldShowCurrencyRateField: TGetShouldShowCurrencyRateField =
    ({ fromAccount, toAccount, fromCategory, toCategory }) => {
        if (
            fromAccount &&
            toAccount &&
            fromAccount.currency !== toAccount.currency
        ) {
            return true;
        }

        if (
            fromCategory &&
            toAccount &&
            fromCategory.currency.toString() !== toAccount.currency.toString()
        ) {
            return true;
        }

        if (
            fromAccount &&
            toCategory &&
            fromAccount.currency.toString() !== toCategory.currency.toString()
        ) {
            return true;
        }

        return false;
    };
