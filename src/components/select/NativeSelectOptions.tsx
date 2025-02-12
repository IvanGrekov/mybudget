import { TGetOptionValue } from 'components/select/types/select.types';
import {
    defaultGetOptionValue,
    defaultGetOptionLabel,
} from 'components/select/utils/optionItem.utils';
import Show from 'components/show/Show';

interface INativeSelectOptionsProps<T> {
    options: T[];
    multiple?: boolean;
    getOptionValue?: TGetOptionValue<T>;
    getOptionLabel?: TGetOptionValue<T>;
}

export default function NativeSelectOptions<T>({
    options,
    multiple,
    getOptionValue = defaultGetOptionValue,
    getOptionLabel = defaultGetOptionLabel,
}: INativeSelectOptionsProps<T>): JSX.Element | null {
    return (
        <>
            <Show when={!multiple}>
                <option value="">Select...</option>
            </Show>

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
