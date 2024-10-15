import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { SIGN_UP_FORM_FIELD_LABELS } from 'features/auth/constants/signUpForm.constants';
import { TSignUpFormValues } from 'features/auth/types/signUpFormValues';
import { CreateUserDtoDefaultCurrencyEnum } from 'types/generated.types';
import {
    getRequiredValidationWarning,
    getMatchValidationWarning,
    getMinLengthValidationWarning,
} from 'utils/formValidationWarning.utils';

export const SIGN_UP_FORM_VALIDATION = yupResolver<TSignUpFormValues>(
    yup.object().shape({
        email: yup
            .string()
            .email(getMatchValidationWarning(SIGN_UP_FORM_FIELD_LABELS.email))
            .required(
                getRequiredValidationWarning(SIGN_UP_FORM_FIELD_LABELS.email),
            ),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required(
                getMinLengthValidationWarning(
                    SIGN_UP_FORM_FIELD_LABELS.password,
                ),
            ),
        confirmPassword: yup
            .string()
            .required(
                getRequiredValidationWarning(
                    SIGN_UP_FORM_FIELD_LABELS.confirmPassword,
                ),
            )
            .oneOf(
                [yup.ref(SIGN_UP_FORM_FIELD_LABELS.password)],
                'Passwords must match',
            ),
        nickname: yup.string().transform((value) => value || undefined),
        defaultCurrency: yup
            .string()
            .oneOf(Object.values(CreateUserDtoDefaultCurrencyEnum))
            .required(
                getRequiredValidationWarning(
                    SIGN_UP_FORM_FIELD_LABELS.defaultCurrency,
                ),
            ),
        timeZone: yup
            .string()
            .required(
                getRequiredValidationWarning(
                    SIGN_UP_FORM_FIELD_LABELS.timeZone,
                ),
            ),
    }),
);
