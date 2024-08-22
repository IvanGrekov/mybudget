import {
    FocusEventHandler,
    KeyboardEventHandler,
    ChangeEventHandler,
    MouseEventHandler,
    RefObject,
} from 'react';

import { TTextFieldBaseProps } from 'types/textFieldBaseProps';

export type TSelectBaseProps = TTextFieldBaseProps & {
    name?: string;
    multiple?: boolean;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    arrowButtonClassName?: string;
    clearValueButtonClassName?: string;
    className?: string;
    onFocus?: FocusEventHandler<HTMLSelectElement>;
    onBlur?: FocusEventHandler<HTMLSelectElement>;
};

export type TSelectValue<T> = T | T[] | null;

export type TOnSelectChange<T> = (value: T | null) => void;

export type TGetOptionLabel<T> = (option: T) => string;

export type TGetOptionValue<T> = (option: T) => string;

export type TGetIsOptionSelected<T> = (args: {
    option: T;
    value: TSelectValue<T>;
}) => boolean;

export type TGetIsOptionDisabled<T> = (option: T) => boolean;

export type TGetIsOptionHidden<T> = (option: T) => boolean;

export type TSelectProps<T> = TSelectBaseProps & {
    value: TSelectValue<T>;
    options: T[];
    shouldCloseOnChange?: boolean;
    shouldAddSearch?: boolean;
    onChange: TOnSelectChange<T>;
    getOptionLabel?: TGetOptionLabel<T>;
    getOptionValue?: TGetOptionValue<T>;
    getIsOptionSelected?: TGetIsOptionSelected<T>;
    getIsOptionDisabled?: TGetIsOptionDisabled<T>;
    getIsOptionHidden?: TGetIsOptionHidden<T>;
};

export interface ISelectFieldHandlers<T> {
    onNativeSelectFocus: TSelectProps<T>['onFocus'];
    onNativeSelectBlur: TSelectProps<T>['onBlur'];
    onNativeSelectKeyDown: KeyboardEventHandler<HTMLSelectElement>;
    onWrapperClick: VoidFunction;
    onWrapperBlur: VoidFunction;
    onArrowButtonClick: MouseEventHandler<HTMLButtonElement>;
    onSelectChange: TOnSelectChange<T>;
}

export type TSelectFieldHandlersArgs<T> = Pick<
    TSelectProps<T>,
    'onFocus' | 'onBlur' | 'onChange' | 'shouldCloseOnChange'
>;

export type TUseLocalNativeSelectValueArgs<T> = Pick<
    TSelectProps<T>,
    'value' | 'getOptionValue'
>;

export type TLocalNativeSelectValue = string | string[] | undefined;

export type TUseLocalNativeSelectValueResult = {
    localNativeSelectValue: TLocalNativeSelectValue;
    onNativeSelectChange: ChangeEventHandler<HTMLSelectElement>;
};

export type TUseSelectFieldArgs<T> = TSelectFieldHandlersArgs<T> &
    TUseLocalNativeSelectValueArgs<T>;

export type TUseSelectFieldResult<T> = ISelectFieldHandlers<T> &
    TUseLocalNativeSelectValueResult & {
        nativeSelectRef: RefObject<HTMLSelectElement>;
        customSelectRef: RefObject<HTMLInputElement>;
        selectOptionsRef: RefObject<HTMLDivElement>;
        id: string;
        isOpen: boolean;
        isFocused: boolean;
        isOptionsFixed: boolean;
        isFieldFilled: boolean;
    };
