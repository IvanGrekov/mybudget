import { useRef, useState } from 'react';

import {
    TUseCheckboxArgs,
    IUseCheckboxResult,
} from 'components/checkbox/types/checkbox.types';
import { getCheckboxHandlers } from 'components/checkbox/utils/checkbox.utils';
import { useInputLabelEnterKeyHandler } from 'hooks/useInputLabelEnterKeyHandler';

type TUseCheckbox = (args: TUseCheckboxArgs) => IUseCheckboxResult;

export const useCheckbox: TUseCheckbox = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useInputLabelEnterKeyHandler(labelRef);

    const checkboxHandlers = getCheckboxHandlers({
        inputRef,
        buttonRef,
        setIsChecked,
        setIsActive,
        ...props,
    });

    return {
        inputRef,
        labelRef,
        buttonRef,
        isChecked,
        isActive,
        ...checkboxHandlers,
    };
};
