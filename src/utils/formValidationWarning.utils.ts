import {
    DEFAULT_MIN_LENGTH,
    DEFAULT_MAX_LENGTH,
} from 'constants/formValidation.constants';
import { getCapitalizedString } from 'utils/string.utils';

type TGetLengthValidationWarning = (
    fieldName: string,
    length?: number,
) => string;

export const getMinLengthValidationWarning: TGetLengthValidationWarning = (
    fieldName,
    minLength = DEFAULT_MIN_LENGTH,
) => {
    const formattedFieldName = getCapitalizedString(fieldName);

    return `${formattedFieldName} must be at least ${minLength} characters long`;
};

export const getMaxLengthValidationWarning: TGetLengthValidationWarning = (
    fieldName,
    maxLength = DEFAULT_MAX_LENGTH,
) => {
    const formattedFieldName = getCapitalizedString(fieldName);

    return `${formattedFieldName} cannot exceed ${maxLength} characters`;
};

type TGetRequiredValidationWarning = (fieldName: string) => string;

export const getRequiredValidationWarning: TGetRequiredValidationWarning = (
    fieldName,
) => {
    const formattedFieldName = getCapitalizedString(fieldName);

    return `${formattedFieldName} is required`;
};
