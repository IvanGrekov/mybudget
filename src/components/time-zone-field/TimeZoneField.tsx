import FormSelectField from 'components/form-fields/FormSelectField';
import { OPTIONS } from 'constants/timeZoneOptions';
import { getTimeZoneFieldLabel } from 'utils/getTimeZoneFieldLabel';

interface ITimeZoneFieldProps {
    name: string;
    label: string;
}

export default function TimeZoneField({
    name,
    label,
}: ITimeZoneFieldProps): JSX.Element {
    return (
        <FormSelectField
            name={name}
            label={label}
            options={OPTIONS}
            shouldAddSearch={true}
            isClearable={false}
            required={true}
            getOptionLabel={getTimeZoneFieldLabel}
        />
    );
}
