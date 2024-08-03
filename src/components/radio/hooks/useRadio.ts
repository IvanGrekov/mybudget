import { useEffect, useRef, useState } from 'react';

import {
    TUseRadioArgs,
    IUseRadioResult,
} from 'components/radio/types/radio.props';
import {
    getRadioSiblings,
    getRadioHandlers,
} from 'components/radio/utils/radio.utils';
import { useInputLabelEnterKeyHandler } from 'hooks/useInputLabelEnterKeyHandler';

type TUseUncheckEvent = (args: {
    name: string;
    value: string;
    setIsChecked: (value: boolean) => void;
}) => void;

const useUncheckEvent: TUseUncheckEvent = ({ name, value, setIsChecked }) => {
    useEffect(() => {
        const radioSiblings = getRadioSiblings({ name, value });

        const onChange = (): void => {
            setIsChecked(false);
        };

        radioSiblings.forEach((radioSibling) => {
            radioSibling.addEventListener('change', onChange);
        });

        return () => {
            radioSiblings.forEach((radioSibling) => {
                radioSibling.removeEventListener('change', onChange);
            });
        };
    }, [name, value, setIsChecked]);
};

type TUseRadio = (args: TUseRadioArgs) => IUseRadioResult;

export const useRadio: TUseRadio = ({ name, value, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useInputLabelEnterKeyHandler(labelRef);
    useUncheckEvent({ name, value, setIsChecked });

    const radioHandlers = getRadioHandlers({
        inputRef,
        buttonRef,
        setIsChecked,
        setIsActive,
        ...rest,
    });

    return {
        inputRef,
        labelRef,
        buttonRef,
        isChecked,
        isActive,
        ...radioHandlers,
    };
};
