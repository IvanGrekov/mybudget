import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    ACCOUNT_FORM_FIELD_LABELS,
    ACCOUNT_NAME_VALIDATION,
    ACCOUNT_BALANCE_VALIDATION,
} from 'features/account-form-modal/constants/accountForm.constants';
import { TCreateAccountFormValues } from 'features/account-form-modal/types/createAccountFormValues';
import {
    CreateAccountDtoTypeEnum,
    CreateAccountDtoCurrencyEnum,
} from 'types/generated.types';
import { getRequiredValidationWarning } from 'utils/formValidationWarning.utils';

export const CREATE_ACCOUNT_FORM_VALIDATION =
    yupResolver<TCreateAccountFormValues>(
        yup.object().shape({
            name: ACCOUNT_NAME_VALIDATION,
            type: yup
                .mixed<CreateAccountDtoTypeEnum>()
                .oneOf(Object.values(CreateAccountDtoTypeEnum))
                .required(
                    getRequiredValidationWarning(
                        ACCOUNT_FORM_FIELD_LABELS.type,
                    ),
                ),
            currency: yup
                .mixed<CreateAccountDtoCurrencyEnum>()
                .oneOf(Object.values(CreateAccountDtoCurrencyEnum))
                .required(
                    getRequiredValidationWarning(
                        ACCOUNT_FORM_FIELD_LABELS.currency,
                    ),
                ),
            balance: ACCOUNT_BALANCE_VALIDATION,
            shouldHideFromOverallBalance: yup.boolean(),
            shouldShowAsIncome: yup.boolean(),
            shouldShowAsExpense: yup.boolean(),
        }),
    );
