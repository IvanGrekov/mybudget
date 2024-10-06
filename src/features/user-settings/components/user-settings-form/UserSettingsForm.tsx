import {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
} from 'react-hook-form';

import Button from 'components/button/Button';
import Fieldset from 'components/fieldset/Fieldset';
import NicknameField from 'features/user-settings/components/nickname-field/NicknameField';
import TimeZoneField from 'features/user-settings/components/time-zone-field/TimeZoneField';
import { IUserSettingsFormData } from 'features/user-settings/types/userSettingsFormData';

interface IUserSettingsFormProps {
    isLoading: boolean;
    isDirty: boolean;
    errors: FieldErrors<IUserSettingsFormData>;
    editUser: (data: IUserSettingsFormData) => void;
    handleSubmit: UseFormHandleSubmit<IUserSettingsFormData, undefined>;
}

export default function UserSettingsForm({
    isLoading,
    isDirty,
    errors,
    editUser,
    handleSubmit,
}: IUserSettingsFormProps): JSX.Element {
    const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;

    const onSubmit: SubmitHandler<IUserSettingsFormData> = (data) => {
        editUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset
                title="User Settings"
                actions={
                    <Button
                        text="Save"
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={isSubmitDisabled}
                    />
                }
            >
                <NicknameField />
                <TimeZoneField />
            </Fieldset>
        </form>
    );
}
