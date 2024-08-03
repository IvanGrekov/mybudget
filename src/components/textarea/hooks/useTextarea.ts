import { useId, useRef, useState, useEffect } from 'react';

import {
    ITextareaHandlersArgs,
    IUseTextareaResult,
} from 'components/textarea/types/textArea.types';
import { getTextareaHandlers } from 'components/textarea/utils/getTextareaHandlers';

type TUseTextarea = (args: ITextareaHandlersArgs) => IUseTextareaResult;

export const useTextarea: TUseTextarea = (args) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const id = useId();

    const [isTextareaFilled, setIsTextareaFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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
