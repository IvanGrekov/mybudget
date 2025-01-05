import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { DEFAULT_DESCRIPTION_MAX_LENGTH } from 'constants/formValidation.constants';
import { CREATE_TRANSACTION_FORM_FIELD_LABELS } from 'features/transaction-form-modal/constants/createTransactionForm.constants';
import {
    TCreateTransactionFormValues,
    ICreateTransactionAccount,
    ICreateTransactionCategory,
} from 'features/transaction-form-modal/types/createTransactionFormValues';
import {
    CreateTransactionDtoTypeEnum,
    AccountCurrencyEnum,
    TransactionCategoryCurrencyEnum,
} from 'types/generated.types';
import {
    getMaxLengthValidationWarning,
    getRequiredValidationWarning,
    getNumberMinValidationWarning,
    getMatchValidationWarning,
} from 'utils/formValidationWarning.utils';

const MIN_VALUE = 0.00001;
const MIN_FEE = 0;

const CREATE_TRANSACTION_ACCOUNT_SCHEMA = yup
    .object<ICreateTransactionAccount>()
    .shape({
        id: yup.number().required(),
        name: yup.string().required(),
        balance: yup.number().required(),
        currency: yup
            .mixed<AccountCurrencyEnum>()
            .oneOf(Object.values(AccountCurrencyEnum))
            .required(),
        iconName: yup.string(),
        iconColor: yup.string(),
    });

const CREATE_TRANSACTION_CATEGORY_SCHEMA = yup
    .object<ICreateTransactionCategory>()
    .shape({
        id: yup.number().required(),
        name: yup.string().required(),
        currency: yup
            .mixed<TransactionCategoryCurrencyEnum>()
            .oneOf(Object.values(TransactionCategoryCurrencyEnum))
            .required(),
        iconName: yup.string(),
        iconColor: yup.string(),
    });

export const CREATE_TRANSACTION_FORM_VALIDATION =
    yupResolver<TCreateTransactionFormValues>(
        yup.object().shape({
            type: yup
                .mixed<CreateTransactionDtoTypeEnum>()
                .oneOf(Object.values(CreateTransactionDtoTypeEnum))
                .required(
                    getRequiredValidationWarning(
                        CREATE_TRANSACTION_FORM_FIELD_LABELS.type,
                    ),
                ),
            fromAccount: CREATE_TRANSACTION_ACCOUNT_SCHEMA.when(
                'type',
                ([value]) => {
                    if (
                        [
                            CreateTransactionDtoTypeEnum.TRANSFER,
                            CreateTransactionDtoTypeEnum.EXPENSE,
                        ].includes(value)
                    ) {
                        return yup
                            .object()
                            .required(
                                getRequiredValidationWarning(
                                    CREATE_TRANSACTION_FORM_FIELD_LABELS.fromAccount,
                                ),
                            );
                    }

                    return yup.object().nullable();
                },
            ),
            toAccount: CREATE_TRANSACTION_ACCOUNT_SCHEMA.when(
                'type',
                ([value]) => {
                    if (
                        [
                            CreateTransactionDtoTypeEnum.TRANSFER,
                            CreateTransactionDtoTypeEnum.INCOME,
                        ].includes(value)
                    ) {
                        return yup
                            .object()
                            .required(
                                getRequiredValidationWarning(
                                    CREATE_TRANSACTION_FORM_FIELD_LABELS.toAccount,
                                ),
                            );
                    }

                    return yup.object().nullable();
                },
            ),
            fromCategory: CREATE_TRANSACTION_CATEGORY_SCHEMA.when(
                'type',
                ([value]) => {
                    if (value === CreateTransactionDtoTypeEnum.INCOME) {
                        return yup
                            .object()
                            .required(
                                getRequiredValidationWarning(
                                    CREATE_TRANSACTION_FORM_FIELD_LABELS.fromCategory,
                                ),
                            );
                    }

                    return yup.object().nullable();
                },
            ),
            toCategory: CREATE_TRANSACTION_CATEGORY_SCHEMA.when(
                'type',
                ([value]) => {
                    if (value === CreateTransactionDtoTypeEnum.EXPENSE) {
                        return yup
                            .object()
                            .required(
                                getRequiredValidationWarning(
                                    CREATE_TRANSACTION_FORM_FIELD_LABELS.toCategory,
                                ),
                            );
                    }

                    return yup.object().nullable();
                },
            ),
            value: yup
                .number()
                .typeError(
                    getMatchValidationWarning(
                        CREATE_TRANSACTION_FORM_FIELD_LABELS.value,
                    ),
                )
                .min(
                    MIN_VALUE,
                    getNumberMinValidationWarning(
                        CREATE_TRANSACTION_FORM_FIELD_LABELS.value,
                        MIN_VALUE,
                    ),
                )
                .required(
                    getRequiredValidationWarning(
                        CREATE_TRANSACTION_FORM_FIELD_LABELS.value,
                    ),
                ),
            fee: yup
                .number()
                .transform((value) => (value ? value : null))
                .min(
                    MIN_FEE,
                    getNumberMinValidationWarning(
                        CREATE_TRANSACTION_FORM_FIELD_LABELS.fee,
                        MIN_FEE,
                    ),
                )
                .nullable(),
            currencyRate: yup.number().nullable(),
            description: yup
                .string()
                .max(
                    DEFAULT_DESCRIPTION_MAX_LENGTH,
                    getMaxLengthValidationWarning(
                        CREATE_TRANSACTION_FORM_FIELD_LABELS.description,
                    ),
                )
                .nullable(),
        }),
    );
