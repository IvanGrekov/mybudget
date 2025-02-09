import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import Show from 'components/show/Show';
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
import { useHandleCurrencyChange } from 'features/transaction-form-modal/components/create-transaction-form-content/hooks/useHandleCurrencyChange';
import { useHandleTransactionTypeChange } from 'features/transaction-form-modal/components/create-transaction-form-content/hooks/useHandleTransactionTypeChange';
import { getShouldShowCurrencyRateField } from 'features/transaction-form-modal/components/create-transaction-form-content/utils/getShouldShowCurrencyRateField';
import { ICreateTransactionModalDataProps } from 'features/transaction-form-modal/components/create-transaction-modal/types/createTransactionModalDataProps';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import styles from 'styles/Form.module.scss';
import { CreateTransactionDtoTypeEnum } from 'types/generated.types';

export default function CreateTransactionFormContent({
    defaultAccount,
    defaultTransactionCategory,
}: ICreateTransactionModalDataProps): JSX.Element {
    const { watch, setValue, clearErrors } =
        useFormContext<TCreateTransactionFormValues>();

    const transactionType = watch('type');
    const fromAccount = watch('fromAccount');
    const toAccount = watch('toAccount');
    const fromCategory = watch('fromCategory');
    const toCategory = watch('toCategory');

    useHandleTransactionTypeChange({
        defaultAccount,
        defaultTransactionCategory,
        transactionType,
        fromAccount,
        toAccount,
        fromCategory,
        toCategory,
        setValue,
        clearErrors,
    });

    useHandleCurrencyChange({
        fromAccount,
        toAccount,
        fromCategory,
        toCategory,
        setValue,
    });

    const shouldShowCurrencyRateField = useMemo(
        () =>
            getShouldShowCurrencyRateField({
                fromAccount,
                toAccount,
                fromCategory,
                toCategory,
            }),
        [fromAccount, toAccount, fromCategory, toCategory],
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
