import { useId, useRef, useState, useEffect } from 'react';

import {
    TTextFieldProps,
    IInputHandlersArgs,
    IUseTextFieldResult,
} from 'components/text-field/types/textField.types';
import { getInputHandlers } from 'components/text-field/utils/textField.utils';
import { useNativeSelectRefCallback } from 'hooks/useNativeSelectRefCallback';

type TUseTextField = (
    args: IInputHandlersArgs &
        Pick<TTextFieldProps, 'nativeSelectRefCallback'> & {
            type: TTextFieldProps['type'];
        },
) => IUseTextFieldResult;

export const useTextField: TUseTextField = ({
    type,
    nativeSelectRefCallback,
    ...rest
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const id = useId();

    const [isInputFilled, setIsInputFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isValueVisible, setIsValueVisible] = useState(false);

    useNativeSelectRefCallback({
        inputRef,
        nativeSelectRefCallback,
    });

    useEffect(() => {
        setIsInputFilled(Boolean(inputRef.current?.value));
    }, [inputRef.current?.value]);

    const inputType = type === 'password' && isValueVisible ? 'text' : type;
    const inputHandlers = getInputHandlers({
        type,
        setIsFocused,
        setIsInputFilled,
        ...rest,
    });

    return {
        inputRef,
        id,
        inputType,
        isInputFilled,
        isFocused: isFocused || isInputFilled,
        isValueVisible,
        setIsValueVisible,
        ...inputHandlers,
    };
};
