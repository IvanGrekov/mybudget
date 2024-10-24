'use client';

import { useForm, FormProvider } from 'react-hook-form';

import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editUser } from 'actions/editUser';
import Show from 'components/show/Show';
import UserCurrencySection from 'features/user-settings/components/user-currency-section/UserCurrencySection';
import UserSecuritySection from 'features/user-settings/components/user-security-section/UserSecuritySection';
import styles from 'features/user-settings/components/user-settings/UserSettings.module.scss';
import UserSettingsForm from 'features/user-settings/components/user-settings-form/UserSettingsForm';
import { USER_SETTINGS_FORM_VALIDATION } from 'features/user-settings/constants/userSettingsForm.constants';
import { IUserSettingsFormData } from 'features/user-settings/types/userSettingsFormData';
import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';

interface IUserSettingsProps {
    user: User;
}

export default function UserSettings({
    user,
}: IUserSettingsProps): JSX.Element {
    const {
        id: userId,
        nickname: userNickname,
        timeZone: userTimeZone,
        defaultCurrency: userDefaultCurrency,
        isTfaEnabled,
        googleId,
    } = user;

    const addErrorMessage = useAddErrorMessageToNotifications();

    const methods = useForm<IUserSettingsFormData>({
        defaultValues: {
            nickname: userNickname,
            timeZone: userTimeZone,
        },
        resolver: USER_SETTINGS_FORM_VALIDATION,
    });

    const { formState, handleSubmit, reset, getValues } = methods;
    const { isDirty, errors } = formState;

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: IUserSettingsFormData) => {
            return editUser({ userId, ...data });
        },
        onSuccess: (data) => {
            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                ...data,
            }));
            reset(getValues());
        },
        onError: (error: Error) => {
            addErrorMessage({
                message: error.message,
            });
        },
    });

    return (
        <div className={styles.container}>
            <FormProvider {...methods}>
                <UserSettingsForm
                    isLoading={isPending}
                    isDirty={isDirty}
                    errors={errors}
                    editUser={mutate}
                    handleSubmit={handleSubmit}
                />
            </FormProvider>

            <UserCurrencySection userDefaultCurrency={userDefaultCurrency} />

            <Show when={!googleId}>
                <UserSecuritySection isTfaEnabled={isTfaEnabled} />
            </Show>
        </div>
    );
}
