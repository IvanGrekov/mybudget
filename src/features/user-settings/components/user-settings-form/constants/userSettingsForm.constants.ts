import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IUserSettingsFormData } from 'features/user-settings/components/user-settings-form/types/userSettingsFormData';
import {
    getMinLengthValidationWarning,
    getMaxLengthValidationWarning,
    getRequiredValidationWarning,
} from 'utils/formValidationWarning.utils';

const NICKNAME_MIN_LENGTH = 3;
const NICKNAME_MAX_LENGTH = 50;

export const USER_SETTINGS_FORM_FIELD_NAMES = {
    nickname: 'nickname',
    timeZone: 'timeZone',
};

export const USER_SETTINGS_FORM_FIELD_LABELS = {
    nickname: 'nickname',
    timeZone: 'Time Zone',
};

export const USER_SETTINGS_FORM_VALIDATION = yupResolver<IUserSettingsFormData>(
    yup.object().shape({
        nickname: yup
            .string()
            .min(
                NICKNAME_MIN_LENGTH,
                getMinLengthValidationWarning(
                    USER_SETTINGS_FORM_FIELD_LABELS.nickname,
                    NICKNAME_MIN_LENGTH,
                ),
            )
            .max(
                NICKNAME_MAX_LENGTH,
                getMaxLengthValidationWarning(
                    USER_SETTINGS_FORM_FIELD_LABELS.nickname,
                    NICKNAME_MAX_LENGTH,
                ),
            )
            .required(
                getRequiredValidationWarning(
                    USER_SETTINGS_FORM_FIELD_LABELS.nickname,
                ),
            ),
        timeZone: yup
            .string()
            .required(
                getRequiredValidationWarning(
                    USER_SETTINGS_FORM_FIELD_LABELS.timeZone,
                ),
            ),
    }),
);
