import { TGetOptionValue } from 'components/select/types/select.types';
import {
    defaultGetOptionValue,
    defaultGetOptionLabel,
} from 'components/select/utils/optionItem.utils';

interface INativeSelectOptionsProps<T> {
    options: T[];
    getOptionValue?: TGetOptionValue<T>;
    getOptionLabel?: TGetOptionValue<T>;
}

export default function NativeSelectOptions<T>({
    options,
    getOptionValue = defaultGetOptionValue,
    getOptionLabel = defaultGetOptionLabel,
}: INativeSelectOptionsProps<T>): JSX.Element | null {
    return (
        <>
            {options.map((option) => {
                const optionValue = getOptionValue(option);

                return (
                    <option key={optionValue} value={optionValue}>
                        {getOptionLabel(option)}
                    </option>
                );
            })}
        </>
    );
}
