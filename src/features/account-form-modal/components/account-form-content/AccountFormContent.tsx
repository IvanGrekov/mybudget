import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import FormCheckboxField from 'components/form-fields/FormCheckboxField';
import FormTextField from 'components/form-fields/FormTextField';
import Show from 'components/show/Show';
import CurrencyField from 'features/account-form-modal/components/account-form-content/CurrencyField';
import TypeField from 'features/account-form-modal/components/account-form-content/TypeField';
import {
    ACCOUNT_FORM_FIELD_NAMES,
    ACCOUNT_FORM_FIELD_LABELS,
} from 'features/account-form-modal/constants/accountForm.constants';
import { CreateAccountFormValues } from 'features/account-form-modal/types/createAccountFormValues';
import styles from 'styles/Form.module.scss';
import { CreateAccountDtoTypeEnum } from 'types/generated.types';

interface IAccountFormContentProps {}

export default function AccountFormContent({}: IAccountFormContentProps): JSX.Element {
    const { watch, setValue } = useFormContext<CreateAccountFormValues>();

    const type = watch('type');
    const isOweMeType = type === CreateAccountDtoTypeEnum.OWE_ME;
    const isIOweType = type === CreateAccountDtoTypeEnum.I_OWE;

    useEffect(() => {
        if (isOweMeType || isIOweType) {
            setValue('shouldHideFromOverallBalance', false);
        }

        if (!isOweMeType) {
            setValue('shouldShowAsIncome', false);
        }

        if (!isIOweType) {
            setValue('shouldShowAsExpense', false);
        }
    }, [isOweMeType, isIOweType, setValue]);

    return (
        <div className={styles.container}>
            <TypeField />

            <FormTextField
                name={ACCOUNT_FORM_FIELD_NAMES.name}
                label={ACCOUNT_FORM_FIELD_LABELS.name}
                required={true}
            />

            <CurrencyField />

            <FormTextField
                name={ACCOUNT_FORM_FIELD_NAMES.balance}
                label={ACCOUNT_FORM_FIELD_LABELS.balance}
                type="number"
            />

            <Show when={!isOweMeType && !isIOweType}>
                <FormCheckboxField
                    name={ACCOUNT_FORM_FIELD_NAMES.shouldHideFromOverallBalance}
                    label={
                        ACCOUNT_FORM_FIELD_LABELS.shouldHideFromOverallBalance
                    }
                />
            </Show>

            <Show when={isOweMeType}>
                <FormCheckboxField
                    name={ACCOUNT_FORM_FIELD_NAMES.shouldShowAsIncome}
                    label={ACCOUNT_FORM_FIELD_LABELS.shouldShowAsIncome}
                />
            </Show>

            <Show when={isIOweType}>
                <FormCheckboxField
                    name={ACCOUNT_FORM_FIELD_NAMES.shouldShowAsExpense}
                    label={ACCOUNT_FORM_FIELD_LABELS.shouldShowAsExpense}
                />
            </Show>
        </div>
    );
}
