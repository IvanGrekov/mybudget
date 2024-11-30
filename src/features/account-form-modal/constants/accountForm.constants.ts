import * as yup from 'yup';

import { DEFAULT_MAX_LENGTH } from 'constants/formValidation.constants';
import {
    getRequiredValidationWarning,
    getMaxLengthValidationWarning,
    getNumberMinValidationWarning,
} from 'utils/formValidationWarning.utils';

export const ACCOUNT_FORM_FIELD_NAMES = {
    name: 'name',
    type: 'type',
    currency: 'currency',
    balance: 'balance',
    shouldHideFromOverallBalance: 'shouldHideFromOverallBalance',
    shouldShowAsIncome: 'shouldShowAsIncome',
    shouldShowAsExpense: 'shouldShowAsExpense',
    status: 'status',
};

export const ACCOUNT_FORM_FIELD_LABELS = {
    name: 'Name',
    type: 'Type',
    currency: 'Currency',
    balance: 'Balance',
    shouldHideFromOverallBalance: 'Hide from overall balance',
    shouldShowAsIncome: 'Consider as income',
    shouldShowAsExpense: 'Consider as expense',
    status: 'Status',
};

const MIN_BALANCE = 0;

export const ACCOUNT_NAME_VALIDATION = yup
    .string()
    .max(
        DEFAULT_MAX_LENGTH,
        getMaxLengthValidationWarning(ACCOUNT_FORM_FIELD_LABELS.name),
    )
    .required(getRequiredValidationWarning(ACCOUNT_FORM_FIELD_LABELS.name));

export const ACCOUNT_BALANCE_VALIDATION = yup
    .number()
    .min(
        MIN_BALANCE,
        getNumberMinValidationWarning(
            ACCOUNT_FORM_FIELD_LABELS.balance,
            MIN_BALANCE,
        ),
    )
    .required(getRequiredValidationWarning(ACCOUNT_FORM_FIELD_LABELS.balance));
