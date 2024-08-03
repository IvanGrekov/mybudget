import {
    ITextareaHandlersArgs,
    ITextareaHandlers,
} from 'components/textarea/types/textArea.types';

type TTGetTextareaHandlersArgs = ITextareaHandlersArgs & {
    setIsFocused: (value: boolean) => void;
    setIsTextareaFilled: (value: boolean) => void;
};

type TGetTextareaHandlers = (
    args: TTGetTextareaHandlersArgs,
) => ITextareaHandlers;

export const getTextareaHandlers: TGetTextareaHandlers = ({
    setIsFocused,
    setIsTextareaFilled,
    onFocus,
    onBlur,
    onClick,
    onChange,
}) => {
    const onTextareaFocus: ITextareaHandlers['onTextareaFocus'] = (event) => {
        setIsFocused(true);
        onFocus?.(event);
    };
    const onTextareaBlur: ITextareaHandlers['onTextareaBlur'] = (event) => {
        setIsFocused(false);
        onBlur?.(event);
    };
    const onTextareaClick: ITextareaHandlers['onTextareaClick'] = (event) => {
        setIsFocused(true);
        onClick?.(event);
    };
    const onTextareaChange: ITextareaHandlers['onTextareaChange'] = (event) => {
        setIsTextareaFilled(!!event.target.value);
        onChange?.(event);
    };

    return {
        onTextareaFocus,
        onTextareaBlur,
        onTextareaClick,
        onTextareaChange,
    };
};
