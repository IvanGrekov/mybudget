'use client';

import { useForm, FormProvider } from 'react-hook-form';

import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editUser } from 'actions/editUser';
import UserSettingsForm from 'features/user-settings/components/user-settings-form/UserSettingsForm';
import { IUserSettingsFormData } from 'features/user-settings/types/userSettingsFormData';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';

interface IUserSettingsProps {
    userId: User['id'];
    userTimeZone: User['timeZone'];
    userNickname: User['nickname'];
}

export default function UserSettings({
    userId,
    userTimeZone,
    userNickname,
}: IUserSettingsProps): JSX.Element {
    const methods = useForm<IUserSettingsFormData>({
        // TODO: Add validation (IG)
        defaultValues: {
            timeZone: userTimeZone,
            nickname: userNickname,
        },
    });

    const { formState, handleSubmit, reset, getValues } = methods;

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: IUserSettingsFormData) => {
            return editUser({ userId, ...data });
        },
        onSuccess: (data) => {
            queryClient.setQueryData(
                [EFetchingTags.USER, { id: userId }],
                (oldData: User) => ({ ...oldData, ...data }),
            );
            reset(getValues());
        },
    });

    return (
        <FormProvider {...methods}>
            <UserSettingsForm
                isLoading={isPending}
                isDirty={formState.isDirty}
                editUser={mutate}
                handleSubmit={handleSubmit}
            />
        </FormProvider>
    );
}
