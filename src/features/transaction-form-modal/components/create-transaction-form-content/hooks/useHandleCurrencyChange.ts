import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { changeExchangeRatesBaseCurrency } from 'utils/changeExchangeRatesBaseCurrency';

interface IUseHandleTransactionTypeChangeArgs {
    fromAccount: TCreateTransactionFormValues['fromAccount'];
    toAccount: TCreateTransactionFormValues['toAccount'];
    fromCategory: TCreateTransactionFormValues['fromCategory'];
    toCategory: TCreateTransactionFormValues['toCategory'];
    setValue: UseFormSetValue<TCreateTransactionFormValues>;
}

export const useHandleCurrencyChange = ({
    fromAccount,
    toAccount,
    fromCategory,
    toCategory,
    setValue,
}: IUseHandleTransactionTypeChangeArgs): void => {
    const fromCurrency = fromAccount?.currency || fromCategory?.currency;
    const toCurrency = toAccount?.currency || toCategory?.currency;

    const baseExchangeRates = useExchangeRatesContext(toCurrency);

    useEffect(() => {
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
    }, [fromCurrency, toCurrency, baseExchangeRates, setValue]);
};
