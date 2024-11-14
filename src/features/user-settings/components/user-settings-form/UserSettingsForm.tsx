'use client';

import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';

import Button from 'components/button/Button';
import Fieldset from 'components/fieldset/Fieldset';
import FormTextField from 'components/form-fields/FormTextField';
import TimeZoneField from 'components/time-zone-field/TimeZoneField';
import {
    USER_SETTINGS_FORM_VALIDATION,
    USER_SETTINGS_FORM_FIELD_NAMES,
    USER_SETTINGS_FORM_FIELD_LABELS,
} from 'features/user-settings/components/user-settings-form/constants/userSettingsForm.constants';
import { useEditUser } from 'features/user-settings/components/user-settings-form/hooks/useEditUser';
import { IUserSettingsFormData } from 'features/user-settings/components/user-settings-form/types/userSettingsFormData';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import { getIsSubmitButtonDisabled } from 'utils/getIsSubmitButtonDisabled';

interface IUserSettingsFormProps {
    userId: number;
    userNickname: string;
    userTimeZone: string;
}

export default function UserSettingsForm({
    userId,
    userNickname,
    userTimeZone,
}: IUserSettingsFormProps): JSX.Element {
    const methods = useForm<IUserSettingsFormData>({
        defaultValues: {
            nickname: userNickname,
            timeZone: userTimeZone,
        },
        resolver: USER_SETTINGS_FORM_VALIDATION,
    });

    const { formState, handleSubmit, reset, getValues } = methods;

    const onCompleted = (): void => {
        reset(getValues());
    };

    const { mutate, isLoading } = useEditUser({
        userId,
        onCompleted,
    });

    const onSubmit: SubmitHandler<IUserSettingsFormData> = (data) => {
        mutate(data);
    };

    const { isDirty, errors } = formState;

    useConfirmNavigation(isDirty);

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset
                    title="User Settings"
                    actions={
                        <Button
                            text="Save"
                            type="submit"
                            isLoading={isLoading}
                            isDisabled={getIsSubmitButtonDisabled({
                                isDirty,
                                errors,
                            })}
                        />
                    }
                >
                    <FormTextField
                        name={USER_SETTINGS_FORM_FIELD_NAMES.nickname}
                        label={USER_SETTINGS_FORM_FIELD_LABELS.nickname}
                        required={true}
                    />
                    <TimeZoneField
                        name={USER_SETTINGS_FORM_FIELD_NAMES.timeZone}
                        label={USER_SETTINGS_FORM_FIELD_LABELS.timeZone}
                    />
                </Fieldset>
            </form>
        </FormProvider>
    );
}
