import {
    IInputHandlersArgs,
    IInputHandlers,
    TTextFieldProps,
} from 'components/text-field/types/textField.types';

type TTGetInputHandlersArgs = IInputHandlersArgs & {
    type: TTextFieldProps['type'];
    setIsFocused: (value: boolean) => void;
    setIsInputFilled: (value: boolean) => void;
};

type TGetInputHandlers = (args: TTGetInputHandlersArgs) => IInputHandlers;

const SKIPPING_CHARS_FOR_TYPE_NUMBER = ['.', 'e', '+', '-'];

export const getInputHandlers: TGetInputHandlers = ({
    type,
    setIsFocused,
    setIsInputFilled,
    onFocus,
    onBlur,
    onClick,
    onChange,
}) => {
    const onInputFocus: IInputHandlers['onInputFocus'] = (event) => {
        setIsFocused(true);
        onFocus?.(event);
    };
    const onInputBlur: IInputHandlers['onInputBlur'] = (event) => {
        setIsFocused(false);
        onBlur?.(event);
    };
    const onInputClick: IInputHandlers['onInputClick'] = (event) => {
        setIsFocused(true);
        onClick?.(event);
    };
    const onInputChange: IInputHandlers['onInputChange'] = (event) => {
        if (type === 'number' && 'data' in event.nativeEvent) {
            const { data } = event.nativeEvent;

            if (
                typeof data === 'string' &&
                SKIPPING_CHARS_FOR_TYPE_NUMBER.includes(data)
            ) {
                return event.preventDefault();
            }
        }

        setIsInputFilled(!!event.target.value);
        onChange?.(event);
    };

    return {
        onInputFocus,
        onInputBlur,
        onInputClick,
        onInputChange,
    };
};

type TGetInputMode = (args: {
    type?: TTextFieldProps['type'];
    inputMode?: TTextFieldProps['inputMode'];
}) => TTextFieldProps['inputMode'];

export const getInputMode: TGetInputMode = ({ type, inputMode }) => {
    if (inputMode) {
        return inputMode;
    }

    if (type === 'number') {
        return 'numeric';
    }

    if (type === 'date' || type === 'password' || !type) {
        return 'text';
    }

    return type;
};
