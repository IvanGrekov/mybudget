import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { changeExchangeRatesBaseCurrency } from 'utils/changeExchangeRatesBaseCurrency';

interface IUseHandleTransactionTypeChangeArgs {
    toAccount: TCreateTransactionFormValues['toAccount'];
    fromAccount: TCreateTransactionFormValues['fromAccount'];
    fromCategory: TCreateTransactionFormValues['fromCategory'];
    setValue: UseFormSetValue<TCreateTransactionFormValues>;
}

export const useHandleCurrencyChange = ({
    toAccount,
    fromAccount,
    fromCategory,
    setValue,
}: IUseHandleTransactionTypeChangeArgs): void => {
    const toCurrency = toAccount?.currency;
    const baseExchangeRates = useExchangeRatesContext(toCurrency);

    useEffect(() => {
        const fromCurrency = fromAccount?.currency || fromCategory?.currency;

        if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
            const exchangeRates = changeExchangeRatesBaseCurrency({
                prevBaseCurrency: toCurrency,
                newBaseCurrency: fromCurrency,
                exchangeRates: baseExchangeRates,
            });

            setValue('currencyRate', exchangeRates[toCurrency]);
        } else {
            setValue('currencyRate', null);
        }
    }, [fromAccount, fromCategory, toCurrency, baseExchangeRates, setValue]);
};
