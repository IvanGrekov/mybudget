import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TUserCurrencyFormData } from 'features/user-settings/components/user-currency-form/types/userCurrencyFormData';
import { EditUserCurrencyDtoDefaultCurrencyEnum } from 'types/generated.types';
import { getRequiredValidationWarning } from 'utils/formValidationWarning.utils';

export const USER_CURRENCY_FORM_FIELD_NAMES = {
    defaultCurrency: 'defaultCurrency',
    isAccountsCurrencySoftUpdate: 'isAccountsCurrencySoftUpdate',
    isTransactionCategoriesCurrencySoftUpdate:
        'isTransactionCategoriesCurrencySoftUpdate',
    isTransactionCategoriesCurrencyForceUpdate:
        'isTransactionCategoriesCurrencyForceUpdate',
};

export const USER_CURRENCY_FORM_FIELD_LABELS = {
    defaultCurrency: 'New Default Currency',
    isAccountsCurrencySoftUpdate: 'Should update accounts currency',
    isTransactionCategoriesCurrencySoftUpdate:
        'Should update transaction categories currency',
    isTransactionCategoriesCurrencyForceUpdate:
        'Should update all transaction categories currency',
};

export const USER_CURRENCY_FORM_VALIDATION = yupResolver<TUserCurrencyFormData>(
    yup.object().shape({
        defaultCurrency: yup
            .mixed<EditUserCurrencyDtoDefaultCurrencyEnum>()
            .oneOf(Object.values(EditUserCurrencyDtoDefaultCurrencyEnum))
            .required(
                getRequiredValidationWarning(
                    USER_CURRENCY_FORM_FIELD_LABELS.defaultCurrency,
                ),
            ),
        isAccountsCurrencySoftUpdate: yup.boolean(),
        isTransactionCategoriesCurrencySoftUpdate: yup.boolean(),
        isTransactionCategoriesCurrencyForceUpdate: yup.boolean(),
    }),
);
