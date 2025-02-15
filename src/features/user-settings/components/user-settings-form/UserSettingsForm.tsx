'use client';

import { useForm, FormProvider } from 'react-hook-form';

import Button from 'components/button/Button';
import Fieldset from 'components/fieldset/Fieldset';
import FormTextField from 'components/form-fields/FormTextField';
import TimeZoneField from 'components/time-zone-field/TimeZoneField';
import {
    USER_SETTINGS_FORM_VALIDATION,
    USER_SETTINGS_FORM_FIELD_NAMES,
} from 'features/user-settings/components/user-settings-form/constants/userSettingsForm.constants';
import { useEditUser } from 'features/user-settings/components/user-settings-form/hooks/useEditUser';
import { IUserSettingsFormData } from 'features/user-settings/components/user-settings-form/types/userSettingsFormData';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import {
    useGetSettingsTranslations,
    useGetActionButtonsTranslations,
    useGetFeatureTranslations,
} from 'hooks/translations.hooks';
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

    const disableNavigationConfirmation = useConfirmNavigation(
        formState.dirtyFields,
    );

    const { mutate, isLoading } = useEditUser({
        userId,
        onCompleted: () => {
            disableNavigationConfirmation();
            reset(getValues());
        },
    });

    const title = useGetSettingsTranslations()('personal_settings');
    const [nicknameFieldLabel, timeZoneFieldLabel] = useGetFeatureTranslations({
        featureName: 'SignUp',
        keys: ['nickname', 'time_zone'],
    });
    const submitButtonText = useGetActionButtonsTranslations()('save');

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(mutate)}>
                <Fieldset
                    title={title}
                    actions={
                        <Button
                            text={submitButtonText}
                            type="submit"
                            isLoading={isLoading}
                            isDisabled={getIsSubmitButtonDisabled(formState)}
                        />
                    }
                >
                    <FormTextField
                        name={USER_SETTINGS_FORM_FIELD_NAMES.nickname}
                        label={nicknameFieldLabel}
                        required={true}
                    />
                    <TimeZoneField
                        name={USER_SETTINGS_FORM_FIELD_NAMES.timeZone}
                        label={timeZoneFieldLabel}
                    />
                </Fieldset>
            </form>
        </FormProvider>
    );
}
