import { RefObject, Dispatch, SetStateAction } from 'react';

import {
    TSelectProps,
    TGetOptionValue,
    TLocalNativeSelectValue,
    TSelectFieldHandlersArgs,
    ISelectFieldHandlers,
    TUseSelectFieldResult,
} from 'components/select/types/select.types';

type TGetLocalNativeSelectValueArgs<T> = {
    value: TSelectProps<T>['value'];
    getOptionValue: TGetOptionValue<T>;
};

export const getLocalNativeSelectValue = <T>({
    value,
    getOptionValue,
}: TGetLocalNativeSelectValueArgs<T>): TLocalNativeSelectValue => {
    const isArray = Array.isArray(value);

    if (isArray) {
        return value.map(getOptionValue);
    }

    if (value === null || value === undefined) {
        return undefined;
    }

    return getOptionValue(value);
};

type TGetSelectFieldHandlersArgs<T> = TSelectFieldHandlersArgs<T> & {
    nativeSelectRef: RefObject<HTMLSelectElement>;
    setIsFocused: Dispatch<SetStateAction<boolean>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const getSelectFieldHandlers = <T>({
    nativeSelectRef,
    shouldCloseOnChange,
    setIsFocused,
    setIsOpen,
    onFocus,
    onBlur,
    onChange,
}: TGetSelectFieldHandlersArgs<T>): ISelectFieldHandlers<T> => {
    const toggleSelect = (): void => {
        setIsFocused((prev) => !prev);
        setIsOpen((prev) => {
            if (!prev) {
                nativeSelectRef.current?.focus();
            }

            return !prev;
        });
    };

    const closeSelect = (): void => {
        setIsFocused(false);
        setIsOpen(false);
    };

    return {
        onNativeSelectFocus: (e): void => {
            onFocus?.(e);
        },
        onNativeSelectBlur: (e): void => {
            onBlur?.(e);
        },
        onNativeSelectKeyDown: (e): void => {
            const key = e.key;

            if (key === 'Tab') {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            switch (key) {
                case 'Escape':
                    closeSelect();
                    break;

                case 'Enter':
                    toggleSelect();
                    break;

                // NOTE: Space key
                case ' ':
                    toggleSelect();
                    break;
            }
        },
        onWrapperClick: (): void => {
            nativeSelectRef.current?.focus();
            setIsFocused(true);
            setIsOpen(true);
        },
        onWrapperBlur: (): void => {
            closeSelect();
        },
        onArrowButtonClick: (e): void => {
            e.stopPropagation();
            toggleSelect();
        },
        onSelectChange: (value): void => {
            onChange(value);
            shouldCloseOnChange && closeSelect();
        },
    };
};

export const getCustomSelectBottomPosition = (
    customSelect: HTMLInputElement,
): number => {
    return customSelect.getBoundingClientRect().bottom;
};

export const getCustomSelectWidth = (
    customSelect: HTMLInputElement,
): number => {
    return customSelect.clientWidth;
};

export const getIsFieldFilled = <T>(
    value: T,
): TUseSelectFieldResult<T>['isFieldFilled'] => {
    const isMultipleValue = Array.isArray(value);

    if (isMultipleValue) {
        return value.length > 0;
    }

    return !!value;
};
