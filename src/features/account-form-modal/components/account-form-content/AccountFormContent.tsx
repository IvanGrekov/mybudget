import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import FormCheckboxField from 'components/form-fields/FormCheckboxField';
import FormTextField from 'components/form-fields/FormTextField';
import Show from 'components/show/Show';
import CurrencyField from 'features/account-form-modal/components/account-form-content/CurrencyField';
import IconColorField from 'features/account-form-modal/components/account-form-content/IconColorField';
import IconNameField from 'features/account-form-modal/components/account-form-content/IconNameField';
import StatusField from 'features/account-form-modal/components/account-form-content/StatusField';
import TypeField from 'features/account-form-modal/components/account-form-content/TypeField';
import {
    ACCOUNT_FORM_FIELD_NAMES,
    ACCOUNT_FORM_FIELD_LABELS,
} from 'features/account-form-modal/constants/accountForm.constants';
import { TCreateAccountFormValues } from 'features/account-form-modal/types/createAccountFormValues';
import styles from 'styles/Form.module.scss';
import { CreateAccountDtoTypeEnum } from 'types/generated.types';

interface IAccountFormContentProps {
    type: string;
    isEdit?: boolean;
}

export default function AccountFormContent({
    type,
    isEdit,
}: IAccountFormContentProps): JSX.Element {
    const { setValue } = useFormContext<TCreateAccountFormValues>();

    const isOweMeType = type === CreateAccountDtoTypeEnum.OWE_ME;
    const isIOweType = type === CreateAccountDtoTypeEnum.I_OWE;

    useEffect(() => {
        if (isOweMeType || isIOweType) {
            setValue('shouldHideFromOverallBalance', false, {
                shouldDirty: true,
                shouldTouch: true,
            });
        }

        if (!isOweMeType) {
            setValue('shouldShowAsIncome', false, {
                shouldDirty: true,
                shouldTouch: true,
            });
        }

        if (!isIOweType) {
            setValue('shouldShowAsExpense', false, {
                shouldDirty: true,
                shouldTouch: true,
            });
        }
    }, [isOweMeType, isIOweType, setValue]);

    return (
        <div className={styles.container}>
            <Show when={!isEdit}>
                <TypeField />
            </Show>

            <Show when={!!isEdit}>
                <StatusField />
            </Show>

            <FormTextField
                name={ACCOUNT_FORM_FIELD_NAMES.name}
                label={ACCOUNT_FORM_FIELD_LABELS.name}
                required={true}
            />

            <Show when={!isEdit}>
                <CurrencyField />
            </Show>

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

            <IconNameField />

            <IconColorField />
        </div>
    );
}
