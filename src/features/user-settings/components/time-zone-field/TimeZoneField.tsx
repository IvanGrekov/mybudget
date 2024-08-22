'use client';

import { useState } from 'react';

import Select from 'components/select/Select';
import { OPTIONS } from 'features/user-settings/components/time-zone-field/constants/options';
import { getTimeZoneFieldLabel } from 'features/user-settings/components/time-zone-field/utils/getTimeZoneFieldLabel';

export default function TimeZoneField(): JSX.Element {
    const [value, setValue] = useState<string | null>(null);

    return (
        <Select
            value={value}
            options={OPTIONS}
            shouldAddSearch={true}
            isFullWidth={true}
            getOptionLabel={getTimeZoneFieldLabel}
            getIsOptionSelected={({ option, value }) => option === value}
            onChange={(value) => {
                setValue(value);
            }}
        />
    );
}
