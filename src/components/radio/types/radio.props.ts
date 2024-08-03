import {
    InputHTMLAttributes,
    RefObject,
    FocusEventHandler,
    MouseEventHandler,
    ChangeEventHandler,
} from 'react';

import { TTypographyVariants } from 'components/typography/types/typographyVariants';

export interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value: string;
    label: string;
    error?: string;
    typographyVariant?: TTypographyVariants;
    className?: string;
    labelClassName?: string;
}

export interface IGetRadioHandlersArgs {
    inputRef: RefObject<HTMLInputElement>;
    buttonRef: RefObject<HTMLButtonElement>;
    setIsChecked: (value: boolean) => void;
    setIsActive: (value: boolean) => void;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export interface IGetRadioHandlersResult {
    onInputFocus: FocusEventHandler<HTMLInputElement>;
    onInputBlur: FocusEventHandler<HTMLInputElement>;
    onInputChange: ChangeEventHandler<HTMLInputElement>;
    onLabelMouseEnter: MouseEventHandler<HTMLLabelElement>;
    onLabelMouseLeave: MouseEventHandler<HTMLLabelElement>;
    onButtonClick: VoidFunction;
}

export type TUseRadioArgs = Pick<
    IGetRadioHandlersArgs,
    'onFocus' | 'onBlur' | 'onChange'
> & {
    name: string;
    value: string;
};

export interface IUseRadioResult extends IGetRadioHandlersResult {
    inputRef: RefObject<HTMLInputElement>;
    labelRef: RefObject<HTMLLabelElement>;
    buttonRef: RefObject<HTMLButtonElement>;
    isChecked: boolean;
    isActive: boolean;
}
