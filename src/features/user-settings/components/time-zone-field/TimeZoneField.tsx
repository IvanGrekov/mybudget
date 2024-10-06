import { useFormContext, Controller } from 'react-hook-form';

import Select from 'components/select/Select';
import { OPTIONS } from 'features/user-settings/components/time-zone-field/constants/options';
import { getTimeZoneFieldLabel } from 'features/user-settings/components/time-zone-field/utils/getTimeZoneFieldLabel';
import { USER_SETTINGS_FORM_FIELD_NAMES } from 'features/user-settings/constants/userSettingsForm.constants';

export default function TimeZoneField(): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={USER_SETTINGS_FORM_FIELD_NAMES.timeZone}
            control={control}
            render={({ field, fieldState }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <Select
                        label={USER_SETTINGS_FORM_FIELD_NAMES.timeZone}
                        options={OPTIONS}
                        shouldAddSearch={true}
                        isFullWidth={true}
                        getOptionLabel={getTimeZoneFieldLabel}
                        getIsOptionSelected={({ option, value }) =>
                            option === value
                        }
                        nativeSelectRefCallback={ref}
                        error={fieldState.error?.message}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
