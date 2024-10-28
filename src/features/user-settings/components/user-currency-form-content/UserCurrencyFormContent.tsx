import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import FormCheckboxField from 'components/form-fields/FormCheckboxField';
import CurrencyField from 'features/user-settings/components/user-currency-form-content/CurrencyField';
import styles from 'features/user-settings/components/user-currency-form-content/UserCurrencyFormContent.module.scss';
import {
    USER_CURRENCY_FORM_FIELD_NAMES,
    USER_CURRENCY_FORM_FIELD_LABELS,
} from 'features/user-settings/constants/userCurrencyForm.constants';
import { EditUserCurrencyDto } from 'types/generated.types';

export default function UserCurrencyFormContent(): JSX.Element {
    const { watch, setValue } = useFormContext<EditUserCurrencyDto>();

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
