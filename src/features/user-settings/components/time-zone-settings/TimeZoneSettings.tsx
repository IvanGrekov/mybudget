'use client';

import { useState } from 'react';

import { editUser } from 'actions/editUser';
import Button from 'components/button/Button';
import Fieldset from 'components/fieldset/Fieldset';
import Select from 'components/select/Select';
import { OPTIONS } from 'features/user-settings/components/time-zone-settings/constants/options';
import { getTimeZoneFieldLabel } from 'features/user-settings/components/time-zone-settings/utils/getTimeZoneFieldLabel';
import { User } from 'types/generated.types';

interface ITimeZoneSettingsProps {
    userId: User['id'];
    initValue: string;
}

export default function TimeZoneSettings({
    userId,
    initValue,
}: ITimeZoneSettingsProps): JSX.Element {
    const [value, setValue] = useState<string | null>(initValue);

    const onClick = (): void => {
        if (!value) {
            return;
        }

        editUser({ userId, timeZone: value });
    };

    return (
        <Fieldset
            title="Time Zone Settings"
            actions={
                <Button
                    text="Save"
                    isDisabled={!value || value === initValue}
                    onClick={onClick}
                />
            }
        >
            <Select
                value={value}
                options={OPTIONS}
                shouldAddSearch={true}
                isFullWidth={true}
                getOptionLabel={getTimeZoneFieldLabel}
                getIsOptionSelected={({ option, value }) => option === value}
                onChange={setValue}
            />
        </Fieldset>
    );
}
