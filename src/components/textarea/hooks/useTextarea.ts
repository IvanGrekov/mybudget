import { useId, useRef, useState, useEffect } from 'react';

import {
    ITextareaHandlersArgs,
    IUseTextareaResult,
    TTextareaProps,
} from 'components/textarea/types/textArea.types';
import { getTextareaHandlers } from 'components/textarea/utils/getTextareaHandlers';
import { useNativeSelectRefCallback } from 'hooks/useNativeSelectRefCallback';

type TUseTextarea = (
    args: ITextareaHandlersArgs &
        Pick<TTextareaProps, 'nativeSelectRefCallback'>,
) => IUseTextareaResult;

export const useTextarea: TUseTextarea = ({
    nativeSelectRefCallback,
    ...args
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const id = useId();

    const [isTextareaFilled, setIsTextareaFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useNativeSelectRefCallback({
        inputRef: textareaRef,
        nativeSelectRefCallback,
    });

    useEffect(() => {
        setIsTextareaFilled(Boolean(textareaRef.current?.value));
    }, []);

    const textareaHandlers = getTextareaHandlers({
        setIsFocused,
        setIsTextareaFilled,
        ...args,
    });

    return {
        textareaRef,
        id,
        isTextareaFilled,
        isFocused: isFocused || isTextareaFilled,
        ...textareaHandlers,
    };
};
