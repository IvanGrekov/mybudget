import * as yup from 'yup';

import { DEFAULT_MAX_LENGTH } from 'constants/formValidation.constants';
import {
    getMaxLengthValidationWarning,
    getRequiredValidationWarning,
} from 'utils/formValidationWarning.utils';

export const TRANSACTION_CATEGORY_FORM_FIELD_NAMES = {
    name: 'name',
    type: 'type',
    currency: 'currency',
    parentId: 'parentId',
    status: 'status',
};

export const TRANSACTION_CATEGORY_FORM_FIELD_LABELS = {
    name: 'Name',
    type: 'Type',
    currency: 'Currency',
    parentId: 'Parent',
    status: 'Status',
};

export const TRANSACTION_CATEGORY_NAME_VALIDATION = yup
    .string()
    .max(
        DEFAULT_MAX_LENGTH,
        getMaxLengthValidationWarning(
            TRANSACTION_CATEGORY_FORM_FIELD_LABELS.name,
        ),
    )
    .required(
        getRequiredValidationWarning(
            TRANSACTION_CATEGORY_FORM_FIELD_LABELS.name,
        ),
    );
