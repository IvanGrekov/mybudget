import { useEffect } from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';

import FormCheckboxField from 'components/form-fields/FormCheckboxField';
import CurrencyField from 'features/user-settings/components/user-currency-form-content/CurrencyField';
import styles from 'features/user-settings/components/user-currency-form-content/UserCurrencyFormContent.module.scss';
import {
    USER_CURRENCY_FORM_FIELD_NAMES,
    USER_CURRENCY_FORM_FIELD_LABELS,
} from 'features/user-settings/constants/userCurrencyForm.constants';
import { TUserCurrencyFormData } from 'features/user-settings/types/userCurrencyFormData';

interface IUserCurrencyFormContent {
    watch: UseFormWatch<TUserCurrencyFormData>;
    setValue: UseFormSetValue<TUserCurrencyFormData>;
}

export default function UserCurrencyFormContent({
    watch,
    setValue,
}: IUserCurrencyFormContent): JSX.Element {
    const isTransactionCategoriesCurrencyForceUpdate = watch(
        'isTransactionCategoriesCurrencyForceUpdate',
    );
    const isTransactionCategoriesCurrencySoftUpdate = watch(
        'isTransactionCategoriesCurrencySoftUpdate',
    );

    useEffect(() => {
        if (isTransactionCategoriesCurrencyForceUpdate) {
            setValue('isTransactionCategoriesCurrencySoftUpdate', false);
        }
    }, [isTransactionCategoriesCurrencyForceUpdate, setValue]);

    useEffect(() => {
        if (isTransactionCategoriesCurrencySoftUpdate) {
            setValue('isTransactionCategoriesCurrencyForceUpdate', false);
        }
    }, [isTransactionCategoriesCurrencySoftUpdate, setValue]);

    return (
        <div className={styles.container}>
            <CurrencyField />

            <FormCheckboxField
                name={
                    USER_CURRENCY_FORM_FIELD_NAMES.isAccountsCurrencySoftUpdate
                }
                label={
                    USER_CURRENCY_FORM_FIELD_LABELS.isAccountsCurrencySoftUpdate
                }
            />

            <FormCheckboxField
                name={
                    USER_CURRENCY_FORM_FIELD_NAMES.isTransactionCategoriesCurrencySoftUpdate
                }
                label={
                    USER_CURRENCY_FORM_FIELD_LABELS.isTransactionCategoriesCurrencySoftUpdate
                }
            />

            <FormCheckboxField
                name={
                    USER_CURRENCY_FORM_FIELD_NAMES.isTransactionCategoriesCurrencyForceUpdate
                }
                label={
                    USER_CURRENCY_FORM_FIELD_LABELS.isTransactionCategoriesCurrencyForceUpdate
                }
            />
        </div>
    );
}
