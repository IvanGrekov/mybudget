import {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
} from 'react-hook-form';

import Button from 'components/button/Button';
import Fieldset from 'components/fieldset/Fieldset';
import FormTextField from 'components/form-fields/FormTextField';
import TimeZoneField from 'components/time-zone-field/TimeZoneField';
import {
    USER_SETTINGS_FORM_FIELD_NAMES,
    USER_SETTINGS_FORM_FIELD_LABELS,
} from 'features/user-settings/constants/userSettingsForm.constants';
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
    );
}
