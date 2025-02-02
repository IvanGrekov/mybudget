import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { DEFAULT_MAX_LENGTH } from 'constants/formValidation.constants';
import { PASSWORD_MIN_LENGTH } from 'features/auth/constants/passwordMinLength';
import {
    SIGN_UP_FORM_FIELD_NAMES,
    SIGN_UP_FORM_FIELD_LABELS,
} from 'features/auth/constants/signUpForm.constants';
import { TSignUpFormValues } from 'features/auth/types/signUpFormValues';
import { SignUpDtoDefaultCurrencyEnum } from 'types/generated.types';
import {
    getRequiredValidationWarning,
    getMatchValidationWarning,
    getMinLengthValidationWarning,
    getMaxLengthValidationWarning,
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
            .min(
                PASSWORD_MIN_LENGTH,
                getMinLengthValidationWarning(
                    SIGN_UP_FORM_FIELD_LABELS.password,
                    PASSWORD_MIN_LENGTH,
                ),
            )
            .required(
                getRequiredValidationWarning(
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
                [yup.ref(SIGN_UP_FORM_FIELD_NAMES.password)],
                'Passwords must match',
            ),
        nickname: yup
            .string()
            .transform((value) => value || undefined)
            .max(
                DEFAULT_MAX_LENGTH,
                getMaxLengthValidationWarning(
                    SIGN_UP_FORM_FIELD_LABELS.nickname,
                ),
            ),
        defaultCurrency: yup
            .string()
            .oneOf(Object.values(SignUpDtoDefaultCurrencyEnum))
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
