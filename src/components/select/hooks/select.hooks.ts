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
    options,
    multiple,
    getOptionValue = defaultGetOptionValue,
    onChange,
}: TUseLocalNativeSelectValueArgs<T>): TUseLocalNativeSelectValueResult => {
    const [localValue, setLocalValue] = useState<TLocalNativeSelectValue>();

    useEffect(() => {
        setLocalValue(
            getLocalNativeSelectValue({
                value,
                getOptionValue,
            }),
        );
    }, [value, getOptionValue]);

    const onNativeSelectChange: TUseLocalNativeSelectValueResult['onNativeSelectChange'] =
        (e) => {
            e.preventDefault();

            let value: TLocalNativeSelectValue;

            if (!multiple) {
                value = e.target.value;
            } else {
                const currentValues = Array.isArray(localValue)
                    ? localValue
                    : [];
                const values = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value,
                );

                if (values.length > currentValues.length) {
                    value = values.find((val) => !currentValues.includes(val));
                } else if (values.length < currentValues.length) {
                    value = currentValues.find((val) => !values.includes(val));
                }
            }

            if (!value) {
                onChange(null);
            } else {
                const option =
                    options.find(
                        (option) => getOptionValue(option) === value,
                    ) || null;
                onChange(option || null);
            }
        };

    return {
        localNativeSelectValue: localValue,
        onNativeSelectChange,
    };
};

export const useSelectField = <T>({
    value,
    options,
    multiple,
    shouldCloseOnChange,
    nativeSelectRefCallback,
    getOptionValue,
    onBlur,
    onFocus,
    onChange,
}: TUseSelectFieldArgs<T>): TUseSelectFieldResult<T> => {
    const nativeSelectRef = useRef<HTMLSelectElement>(null);
    const customSelectRef = useRef<HTMLInputElement>(null);
    const selectOptionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (nativeSelectRefCallback && nativeSelectRef.current) {
            nativeSelectRefCallback(nativeSelectRef.current);
        }
    }, [nativeSelectRefCallback]);

    const id = useId();

    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { isOptionsFixed } = useFixedSelectOptions({
        isOpen,
        customSelectRef,
        selectOptionsRef,
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

    const nativeSelectLocalValueState = useLocalNativeSelectValue({
        value,
        options,
        multiple,
        onChange: selectFieldHandlers.onSelectChange,
        getOptionValue,
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
