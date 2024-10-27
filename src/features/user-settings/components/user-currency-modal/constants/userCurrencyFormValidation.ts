import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { USER_CURRENCY_FORM_FIELD_LABELS } from 'features/user-settings/constants/userCurrencyForm.constants';
import { TUserCurrencyFormData } from 'features/user-settings/types/userCurrencyFormData';
import { EditUserCurrencyDtoDefaultCurrencyEnum } from 'types/generated.types';
import { getRequiredValidationWarning } from 'utils/formValidationWarning.utils';

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
