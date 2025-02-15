import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import FormCheckboxField from 'components/form-fields/FormCheckboxField';
import CurrencyField from 'features/user-currency-section/user-currency-form-content/CurrencyField';
import { USER_CURRENCY_FORM_FIELD_NAMES } from 'features/user-settings/constants/userCurrencyForm.constants';
import { useGetSettingsTranslations } from 'hooks/translations.hooks';
import styles from 'styles/Form.module.scss';
import { EditUserCurrencyDto } from 'types/generated.types';

export default function UserCurrencyFormContent(): JSX.Element {
    const {
        formState: { dirtyFields },
        watch,
        setValue,
    } = useFormContext<EditUserCurrencyDto>();

    const settingsTranslations = useGetSettingsTranslations();

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
                label={settingsTranslations(
                    'accounts_currency_soft_update_field_label',
                )}
            />

            <FormCheckboxField
                disabled={isDefaultCurrencyChanged}
                name={
                    USER_CURRENCY_FORM_FIELD_NAMES.isTransactionCategoriesCurrencySoftUpdate
                }
                label={settingsTranslations(
                    'transaction_categories_currency_soft_update_field_label',
                )}
            />

            <FormCheckboxField
                disabled={isDefaultCurrencyChanged}
                name={
                    USER_CURRENCY_FORM_FIELD_NAMES.isTransactionCategoriesCurrencyForceUpdate
                }
                label={settingsTranslations(
                    'transaction_categories_currency_force_update_field_label',
                )}
            />
        </div>
    );
}
