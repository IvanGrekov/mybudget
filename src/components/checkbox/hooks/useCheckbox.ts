import { useRef, useState } from 'react';

import {
    TUseCheckboxArgs,
    IUseCheckboxResult,
} from 'components/checkbox/types/checkbox.types';
import { getCheckboxHandlers } from 'components/checkbox/utils/checkbox.utils';
import { useInputLabelEnterKeyHandler } from 'hooks/useInputLabelEnterKeyHandler';
import { useNativeSelectRefCallback } from 'hooks/useNativeSelectRefCallback';

type TUseCheckbox = (args: TUseCheckboxArgs) => IUseCheckboxResult;

export const useCheckbox: TUseCheckbox = ({
    nativeSelectRefCallback,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isActive, setIsActive] = useState(false);

    useNativeSelectRefCallback({
        inputRef,
        nativeSelectRefCallback,
    });

    useInputLabelEnterKeyHandler(labelRef);

    const checkboxHandlers = getCheckboxHandlers({
        inputRef,
        buttonRef,
        setIsActive,
        nativeSelectRefCallback,
        ...props,
    });

    return {
        inputRef,
        labelRef,
        buttonRef,
        isActive,
        ...checkboxHandlers,
    };
};
