import {
    TLocalNativeSelectValue,
    TGetOptionValue,
} from 'components/select/types/select.types';
import { defaultGetOptionValue } from 'components/select/utils/optionItem.utils';

interface INativeSelectOptionsProps<T> {
    localNativeSelectValue: TLocalNativeSelectValue;
    options: T[];
    getOptionValue?: TGetOptionValue<T>;
}

export default function NativeSelectOptions<T>({
    localNativeSelectValue,
    options,
    getOptionValue = defaultGetOptionValue,
}: INativeSelectOptionsProps<T>): JSX.Element | null {
    if (typeof localNativeSelectValue === 'undefined') {
        const option = options.at(0);

        if (!option) {
            return null;
        }

        const optionValue = getOptionValue(option);

        return <option value={optionValue}>{optionValue}</option>;
    }

    if (Array.isArray(localNativeSelectValue)) {
        return (
            <>
                {localNativeSelectValue.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </>
        );
    }

    return (
        <option value={localNativeSelectValue}>{localNativeSelectValue}</option>
    );
}
