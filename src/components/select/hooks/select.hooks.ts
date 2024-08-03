import { useRef, useId, useState, useEffect } from 'react';

import { useFixedSelectOptions } from 'components/select/hooks/options.hooks';
import {
    TUseLocalNativeSelectValueArgs,
    TUseLocalNativeSelectValueResult,
    TLocalNativeSelectValue,
    TUseSelectFieldArgs,
    TUseSelectFieldResult,
} from 'components/select/types/select.types';
import { defaultGetOptionValue } from 'components/select/utils/optionItem.utils';
import {
    getIsFieldFilled,
    getLocalNativeSelectValue,
    getSelectFieldHandlers,
} from 'components/select/utils/select.utils';

const useLocalNativeSelectValue = <T>({
    value,
    getOptionValue = defaultGetOptionValue,
}: TUseLocalNativeSelectValueArgs<T>): TUseLocalNativeSelectValueResult => {
    const [localValue, setLocalValue] = useState<TLocalNativeSelectValue>();

    useEffect(() => {
        const newLocalValue = getLocalNativeSelectValue({
            value,
            getOptionValue,
        });
        setLocalValue(newLocalValue);
    }, [value, getOptionValue]);

    return {
        localNativeSelectValue: localValue,
        onNativeSelectChange: (): void => {
            // Placeholder
        },
    };
};

export const useSelectField = <T>({
    value,
    shouldCloseOnChange,
    getOptionValue,
    onBlur,
    onFocus,
    onChange,
}: TUseSelectFieldArgs<T>): TUseSelectFieldResult<T> => {
    const nativeSelectRef = useRef<HTMLSelectElement>(null);
    const customSelectRef = useRef<HTMLInputElement>(null);
    const selectOptionsRef = useRef<HTMLDivElement>(null);

    const id = useId();

    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { isOptionsFixed } = useFixedSelectOptions({
        isOpen,
        customSelectRef,
        selectOptionsRef,
    });

    const nativeSelectLocalValueState = useLocalNativeSelectValue({
        value,
        getOptionValue,
    });

    const selectFieldHandlers = getSelectFieldHandlers<T>({
        nativeSelectRef,
        shouldCloseOnChange,
        setIsFocused,
        setIsOpen,
        onBlur,
        onFocus,
        onChange,
    });

    const isFieldFilled = getIsFieldFilled(value);

    return {
        nativeSelectRef,
        customSelectRef,
        selectOptionsRef,
        id,
        isOpen,
        isOptionsFixed,
        isFocused: isFocused || isFieldFilled,
        isFieldFilled,
        ...nativeSelectLocalValueState,
        ...selectFieldHandlers,
    };
};
