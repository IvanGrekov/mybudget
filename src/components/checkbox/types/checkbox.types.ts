import {
    InputHTMLAttributes,
    RefObject,
    FocusEventHandler,
    MouseEventHandler,
    ChangeEventHandler,
} from 'react';

import { TTypographyVariants } from 'components/typography/types/typographyVariants';
import { TBaseInputContainerProps } from 'types/input.types';

export type TCheckboxProps = InputHTMLAttributes<HTMLInputElement> &
    TBaseInputContainerProps & {
        label: string;
        typographyVariant?: TTypographyVariants;
        className?: string;
        containerClassName?: string;
        labelClassName?: string;
    };

export interface IGetCheckboxHandlersArgs {
    inputRef: RefObject<HTMLInputElement>;
    buttonRef: RefObject<HTMLButtonElement>;
    setIsChecked: (value: boolean) => void;
    setIsActive: (value: boolean) => void;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export interface IGetCheckboxHandlersResult {
    onInputFocus: FocusEventHandler<HTMLInputElement>;
    onInputBlur: FocusEventHandler<HTMLInputElement>;
    onInputChange: ChangeEventHandler<HTMLInputElement>;
    onLabelMouseEnter: MouseEventHandler<HTMLLabelElement>;
    onLabelMouseLeave: MouseEventHandler<HTMLLabelElement>;
    onButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export type TUseCheckboxArgs = Pick<
    IGetCheckboxHandlersArgs,
    'onFocus' | 'onBlur' | 'onChange'
>;

export interface IUseCheckboxResult extends IGetCheckboxHandlersResult {
    inputRef: RefObject<HTMLInputElement>;
    labelRef: RefObject<HTMLLabelElement>;
    buttonRef: RefObject<HTMLButtonElement>;
    isChecked: boolean;
    isActive: boolean;
}
