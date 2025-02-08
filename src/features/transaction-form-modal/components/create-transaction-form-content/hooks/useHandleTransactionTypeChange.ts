import { useEffect, useRef } from 'react';
import { UseFormSetValue, UseFormClearErrors } from 'react-hook-form';

import { ICreateTransactionModalDataProps } from 'features/transaction-form-modal/components/create-transaction-modal/types/createTransactionModalDataProps';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import {
    TransactionCategoryTypeEnum,
    CreateTransactionDtoTypeEnum,
} from 'types/generated.types';

type TUseHandleTransactionTypeChangeArgs = ICreateTransactionModalDataProps & {
    transactionType: TCreateTransactionFormValues['type'];
    fromAccount: TCreateTransactionFormValues['fromAccount'];
    toAccount: TCreateTransactionFormValues['toAccount'];
    fromCategory: TCreateTransactionFormValues['fromCategory'];
    toCategory: TCreateTransactionFormValues['toCategory'];
    setValue: UseFormSetValue<TCreateTransactionFormValues>;
    clearErrors: UseFormClearErrors<TCreateTransactionFormValues>;
};

export const useHandleTransactionTypeChange = ({
    defaultAccount = null,
    defaultTransactionCategory = null,
    transactionType,
    fromAccount,
    toAccount,
    fromCategory,
    toCategory,
    setValue,
    clearErrors,
}: TUseHandleTransactionTypeChangeArgs): void => {
    const shouldPrefillAccount = useRef(true);
    const shouldPrefillCategory = useRef(true);

    const { type } = defaultTransactionCategory || {};
    const isDefaultCategoryExpense =
        type === TransactionCategoryTypeEnum.EXPENSE;
    const isDefaultCategoryIncome = type === TransactionCategoryTypeEnum.INCOME;

    // NOTE: Pre-fill account and category based on transaction type
    useEffect(() => {
        const prefillingAccount = shouldPrefillAccount.current
            ? defaultAccount
            : null;
        const prefillingCategory = shouldPrefillCategory.current
            ? defaultTransactionCategory
            : null;

        switch (transactionType) {
            case CreateTransactionDtoTypeEnum.EXPENSE:
                setValue('fromAccount', prefillingAccount);
                setValue('toAccount', null);
                setValue('fromCategory', null);
                setValue(
                    'toCategory',
                    isDefaultCategoryExpense ? prefillingCategory : null,
                );
                clearErrors(['toAccount', 'fromCategory']);
                break;

            case CreateTransactionDtoTypeEnum.INCOME:
                setValue('fromAccount', null);
                setValue('toAccount', prefillingAccount);
                setValue(
                    'fromCategory',
                    isDefaultCategoryIncome ? prefillingCategory : null,
                );
                setValue('toCategory', null);
                clearErrors(['fromAccount', 'toCategory']);
                break;

            case CreateTransactionDtoTypeEnum.TRANSFER:
                setValue('fromCategory', null);
                setValue('toCategory', null);
                clearErrors(['fromCategory', 'toCategory']);
                break;
        }
    }, [
        defaultAccount,
        defaultTransactionCategory,
        transactionType,
        isDefaultCategoryExpense,
        isDefaultCategoryIncome,
        setValue,
        clearErrors,
    ]);

    // NOTE: Disable prefilling account if User has changed it manually
    useEffect(() => {
        if (!shouldPrefillAccount.current) {
            return;
        }

        if (
            transactionType === CreateTransactionDtoTypeEnum.EXPENSE &&
            fromAccount &&
            fromAccount.id !== defaultAccount?.id
        ) {
            shouldPrefillAccount.current = false;
        }

        if (
            transactionType === CreateTransactionDtoTypeEnum.INCOME &&
            toAccount &&
            toAccount.id !== defaultAccount?.id
        ) {
            shouldPrefillAccount.current = false;
        }
    }, [defaultAccount, transactionType, fromAccount, toAccount]);

    // NOTE: Disable prefilling category if User has changed it manually
    useEffect(() => {
        if (!shouldPrefillCategory.current) {
            return;
        }

        if (
            transactionType === CreateTransactionDtoTypeEnum.EXPENSE &&
            fromCategory &&
            fromCategory.id !== defaultTransactionCategory?.id
        ) {
            shouldPrefillCategory.current = false;
        }

        if (
            transactionType === CreateTransactionDtoTypeEnum.INCOME &&
            toCategory &&
            toCategory.id !== defaultTransactionCategory?.id
        ) {
            shouldPrefillCategory.current = false;
        }
    }, [defaultTransactionCategory, transactionType, fromCategory, toCategory]);
};
