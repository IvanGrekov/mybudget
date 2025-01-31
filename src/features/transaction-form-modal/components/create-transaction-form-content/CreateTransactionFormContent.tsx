import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import Show from 'components/show/Show';
import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import CurrencyRateField from 'features/transaction-form-modal/components/create-transaction-form-content/CurrencyRateField';
import DescriptionField from 'features/transaction-form-modal/components/create-transaction-form-content/DescriptionField';
import FeeField from 'features/transaction-form-modal/components/create-transaction-form-content/FeeField';
import FromAccountField from 'features/transaction-form-modal/components/create-transaction-form-content/FromAccountField';
import FromCategoryField from 'features/transaction-form-modal/components/create-transaction-form-content/FromCategoryField';
import ToAccountField from 'features/transaction-form-modal/components/create-transaction-form-content/ToAccountField';
import ToCategoryField from 'features/transaction-form-modal/components/create-transaction-form-content/ToCategoryField';
import TransactionCurrencyContainer from 'features/transaction-form-modal/components/create-transaction-form-content/TransactionCurrencyContainer';
import TypeField from 'features/transaction-form-modal/components/create-transaction-form-content/TypeField';
import ValueField from 'features/transaction-form-modal/components/create-transaction-form-content/ValueField';
import { getShouldShowCurrencyRateField } from 'features/transaction-form-modal/components/create-transaction-form-content/utils/getShouldShowCurrencyRateField';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import styles from 'styles/Form.module.scss';
import { CreateTransactionDtoTypeEnum } from 'types/generated.types';
import { changeExchangeRatesBaseCurrency } from 'utils/changeExchangeRatesBaseCurrency';

export default function CreateTransactionFormContent(): JSX.Element {
    const { watch, setValue, clearErrors } =
        useFormContext<TCreateTransactionFormValues>();

    const transactionType = watch('type');
    const fromAccount = watch('fromAccount');
    const toAccount = watch('toAccount');
    const fromCategory = watch('fromCategory');

    const toCurrency = toAccount?.currency;
    const baseExchangeRates = useExchangeRatesContext(toCurrency);

    useEffect(() => {
        switch (transactionType) {
            case CreateTransactionDtoTypeEnum.EXPENSE:
                setValue('toAccount', null);
                setValue('fromCategory', null);
                clearErrors(['toAccount', 'fromCategory']);
                break;
            case CreateTransactionDtoTypeEnum.INCOME:
                setValue('fromAccount', null);
                setValue('toCategory', null);
                clearErrors(['fromAccount', 'toCategory']);
                break;
            case CreateTransactionDtoTypeEnum.TRANSFER:
                setValue('fromCategory', null);
                setValue('toCategory', null);
                clearErrors(['fromCategory', 'toCategory']);
                break;
        }
    }, [transactionType, setValue, clearErrors]);

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

    const shouldShowCurrencyRateField = useMemo(
        () =>
            getShouldShowCurrencyRateField({
                fromAccount,
                toAccount,
                fromCategory,
            }),
        [fromAccount, toAccount, fromCategory],
    );

    const isExpense = transactionType === CreateTransactionDtoTypeEnum.EXPENSE;
    const isIncome = transactionType === CreateTransactionDtoTypeEnum.INCOME;
    const isTransfer =
        transactionType === CreateTransactionDtoTypeEnum.TRANSFER;

    return (
        <div className={styles.container}>
            <TypeField />

            <Show when={isExpense}>
                <FromAccountField />
                <ToCategoryField />
            </Show>

            <Show when={isIncome}>
                <FromCategoryField />
                <ToAccountField />
            </Show>

            <Show when={isTransfer}>
                <FromAccountField />
                <ToAccountField />
            </Show>

            <Show when={shouldShowCurrencyRateField}>
                <CurrencyRateField />
            </Show>

            <TransactionCurrencyContainer>
                <ValueField />
            </TransactionCurrencyContainer>

            <TransactionCurrencyContainer>
                <FeeField />
            </TransactionCurrencyContainer>

            <DescriptionField />
        </div>
    );
}
