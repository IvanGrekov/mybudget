import CheckedCircleIcon from 'components/icons/CheckedCircleIcon';
import OutlinedCircleIcon from 'components/icons/OutlinedCircleIcon';
import { IIconProps } from 'components/icons/types/iconProps';
import {
    IGetRadioHandlersArgs,
    IGetRadioHandlersResult,
} from 'components/radio/types/radio.props';

type TGetIcon = (isChecked: boolean) => (props: IIconProps) => JSX.Element;

export const getIcon: TGetIcon = (isChecked) => {
    return isChecked ? CheckedCircleIcon : OutlinedCircleIcon;
};

type TGetRadioHandlers = (
    args: IGetRadioHandlersArgs,
) => IGetRadioHandlersResult;

export const getRadioHandlers: TGetRadioHandlers = ({
    inputRef,
    buttonRef,
    setIsChecked,
    setIsActive,
    onFocus,
    onBlur,
    onChange,
}) => {
    const onLabelMouseEnter: IGetRadioHandlersResult['onLabelMouseEnter'] =
        () => {
            setIsActive(true);
        };

    const onLabelMouseLeave: IGetRadioHandlersResult['onLabelMouseLeave'] =
        () => {
            setIsActive(false);
        };

    const onInputFocus: IGetRadioHandlersResult['onInputFocus'] = (e) => {
        buttonRef.current?.focus();
        onFocus?.(e);
    };

    const onInputBlur: IGetRadioHandlersResult['onInputBlur'] = (e) => {
        buttonRef.current?.blur();
        onBlur?.(e);
    };

    const onInputChange: IGetRadioHandlersResult['onInputChange'] = (e) => {
        setIsChecked(e.target.checked);
        onChange?.(e);
    };

    const onButtonClick = (): void => {
        inputRef.current?.click();
    };

    return {
        onInputFocus,
        onInputBlur,
        onInputChange,
        onLabelMouseEnter,
        onLabelMouseLeave,
        onButtonClick,
    };
};

type TGetRadioSiblings = (args: {
    name: string;
    value: string;
}) => NodeListOf<HTMLInputElement>;

export const getRadioSiblings: TGetRadioSiblings = ({ name, value }) => {
    return document.querySelectorAll<HTMLInputElement>(
        `input[name="${name}"]:not([value="${value}"])`,
    );
};
