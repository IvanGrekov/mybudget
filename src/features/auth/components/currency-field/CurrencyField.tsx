import FormSelectField from 'components/form-fields/FormSelectField';
import { CreateUserDtoDefaultCurrencyEnum } from 'types/generated.types';

interface ICurrencyFieldProps {
    name: string;
    label: string;
}

const OPTIONS = Object.values(CreateUserDtoDefaultCurrencyEnum);

export default function CurrencyField({
    name,
    label,
}: ICurrencyFieldProps): JSX.Element {
    return (
        <FormSelectField
            name={name}
            label={label}
            options={OPTIONS}
            isClearable={false}
            required={true}
        />
    );
}
