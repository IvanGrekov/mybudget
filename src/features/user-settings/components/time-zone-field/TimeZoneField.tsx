import { useFormContext, Controller } from 'react-hook-form';

import Select from 'components/select/Select';
import { OPTIONS } from 'features/user-settings/components/time-zone-field/constants/options';
import { getTimeZoneFieldLabel } from 'features/user-settings/components/time-zone-field/utils/getTimeZoneFieldLabel';

export default function TimeZoneField(): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name="timeZone"
            control={control}
            render={({ field }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <Select
                        options={OPTIONS}
                        shouldAddSearch={true}
                        isFullWidth={true}
                        getOptionLabel={getTimeZoneFieldLabel}
                        getIsOptionSelected={({ option, value }) =>
                            option === value
                        }
                        nativeSelectRefCallback={ref}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
