import { TLocalNativeSelectValue } from 'components/select/types/select.types';

interface INativeSelectOptionsProps {
    localNativeSelectValue: TLocalNativeSelectValue;
}

export default function NativeSelectOptions({
    localNativeSelectValue,
}: INativeSelectOptionsProps): JSX.Element | null {
    if (localNativeSelectValue === undefined) {
        return null;
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
