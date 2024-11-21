import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ACCOUNT_FORM_FIELD_LABELS } from 'features/account-form-modal/constants/accountForm.constants';
import { CreateAccountFormValues } from 'features/account-form-modal/types/createAccountFormValues';
import {
    CreateAccountDtoTypeEnum,
    CreateAccountDtoCurrencyEnum,
} from 'types/generated.types';
import {
    getRequiredValidationWarning,
    getNumberMinValidationWarning,
} from 'utils/formValidationWarning.utils';

const MIN_BALANCE = 0;

export const CREATE_ACCOUNT_FORM_VALIDATION =
    yupResolver<CreateAccountFormValues>(
        yup.object().shape({
            name: yup
                .string()
                .required(
                    getRequiredValidationWarning(
                        ACCOUNT_FORM_FIELD_LABELS.name,
                    ),
                ),
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
            balance: yup
                .number()
                .min(
                    MIN_BALANCE,
                    getNumberMinValidationWarning(
                        ACCOUNT_FORM_FIELD_LABELS.balance,
                        MIN_BALANCE,
                    ),
                )
                .required(
                    getRequiredValidationWarning(
                        ACCOUNT_FORM_FIELD_LABELS.balance,
                    ),
                ),
            shouldHideFromOverallBalance: yup.boolean(),
            shouldShowAsIncome: yup.boolean(),
            shouldShowAsExpense: yup.boolean(),
        }),
    );
