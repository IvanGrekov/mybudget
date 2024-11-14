import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import FormCheckboxField from 'components/form-fields/FormCheckboxField';
import CurrencyField from 'features/user-currency-section/user-currency-form-content/CurrencyField';
import styles from 'features/user-currency-section/user-currency-form-content/UserCurrencyFormContent.module.scss';
import {
    USER_CURRENCY_FORM_FIELD_NAMES,
    USER_CURRENCY_FORM_FIELD_LABELS,
} from 'features/user-settings/constants/userCurrencyForm.constants';
import { EditUserCurrencyDto } from 'types/generated.types';

export default function UserCurrencyFormContent(): JSX.Element {
    const {
        formState: { dirtyFields },
        watch,
        setValue,
    } = useFormContext<EditUserCurrencyDto>();

    const isDefaultCurrencyChanged = !dirtyFields.defaultCurrency;

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
                disabled={isDefaultCurrencyChanged}
                name={
                    USER_CURRENCY_FORM_FIELD_NAMES.isAccountsCurrencySoftUpdate
                }
                label={
                    USER_CURRENCY_FORM_FIELD_LABELS.isAccountsCurrencySoftUpdate
                }
            />

            <FormCheckboxField
                disabled={isDefaultCurrencyChanged}
                name={
                    USER_CURRENCY_FORM_FIELD_NAMES.isTransactionCategoriesCurrencySoftUpdate
                }
                label={
                    USER_CURRENCY_FORM_FIELD_LABELS.isTransactionCategoriesCurrencySoftUpdate
                }
            />

            <FormCheckboxField
                disabled={isDefaultCurrencyChanged}
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
