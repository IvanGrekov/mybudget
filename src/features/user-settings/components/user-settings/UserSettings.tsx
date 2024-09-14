'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { editUser } from 'actions/editUser';
import Button from 'components/button/Button';
import Fieldset from 'components/fieldset/Fieldset';
import TimeZoneField from 'features/user-settings/components/time-zone-field/TimeZoneField';
import { useAsyncActionHandler } from 'hooks/useAsyncActionHandler';
import { User } from 'types/generated.types';

interface IUserSettingsProps {
    userId: User['id'];
    userTimeZone: User['timeZone'];
    userNickname: User['nickname'];
}

interface IFormData {
    timeZone: string;
    nickname: string;
}

export default function UserSettings({
    userId,
    userTimeZone,
    userNickname,
}: IUserSettingsProps): JSX.Element {
    const methods = useForm<IFormData>({
        defaultValues: {
            timeZone: userTimeZone,
            nickname: userNickname,
        },
    });

    const { formState, handleSubmit, reset, getValues } = methods;

    const { isLoading, asyncActionHandler } = useAsyncActionHandler({
        action: editUser,
        onCompleted: () => reset(getValues()),
    });

    const onSubmit: SubmitHandler<IFormData> = ({ timeZone, nickname }) => {
        asyncActionHandler({
            userId,
            timeZone,
            nickname,
        });
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset
                    title="User Settings"
                    actions={
                        <>
                            <Button
                                text="Save"
                                type="submit"
                                isLoading={isLoading}
                                isDisabled={!formState.isDirty}
                            />
                        </>
                    }
                >
                    <TimeZoneField />
                </Fieldset>
            </form>
        </FormProvider>
    );
}
