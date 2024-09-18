import { useFormContext, Controller } from 'react-hook-form';

import TextField from 'components/text-field/TextField';
import { USER_SETTINGS_FORM_FIELD_NAMES } from 'features/user-settings/constants/userSettingsForm.constants';

export default function NicknameField(): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={USER_SETTINGS_FORM_FIELD_NAMES.nickname}
            control={control}
            render={({ field, fieldState }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <TextField
                        isFullWidth={true}
                        nativeSelectRefCallback={ref}
                        error={fieldState.error?.message}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
