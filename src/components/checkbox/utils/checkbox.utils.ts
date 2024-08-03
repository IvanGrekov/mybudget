import {
    IGetCheckboxHandlersArgs,
    IGetCheckboxHandlersResult,
} from 'components/checkbox/types/checkbox.types';
import CheckedSquareIcon from 'components/icons/CheckedSquareIcon';
import OutlinedSquareIcon from 'components/icons/OutlinedSquareIcon';
import { IIconProps } from 'components/icons/types/iconProps';

type TGetIcon = (isChecked: boolean) => (props: IIconProps) => JSX.Element;

export const getIcon: TGetIcon = (isChecked) => {
    return isChecked ? CheckedSquareIcon : OutlinedSquareIcon;
};

type TGetCheckboxHandlers = (
    args: IGetCheckboxHandlersArgs,
) => IGetCheckboxHandlersResult;

export const getCheckboxHandlers: TGetCheckboxHandlers = ({
    inputRef,
    buttonRef,
    setIsChecked,
    setIsActive,
    onFocus,
    onBlur,
    onChange,
}) => {
    const onLabelMouseEnter: IGetCheckboxHandlersResult['onLabelMouseEnter'] =
        () => {
            setIsActive(true);
        };

    const onLabelMouseLeave: IGetCheckboxHandlersResult['onLabelMouseLeave'] =
        () => {
            setIsActive(false);
        };

    const onInputFocus: IGetCheckboxHandlersResult['onInputFocus'] = (e) => {
        buttonRef.current?.focus();
        onFocus?.(e);
    };

    const onInputBlur: IGetCheckboxHandlersResult['onInputBlur'] = (e) => {
        buttonRef.current?.blur();
        onBlur?.(e);
    };

    const onInputChange: IGetCheckboxHandlersResult['onInputChange'] = (e) => {
        setIsChecked(e.target.checked);
        onChange?.(e);
    };

    const onButtonClick: IGetCheckboxHandlersResult['onButtonClick'] = (e) => {
        if (inputRef.current) {
            const eventDetail = e.detail;
            const newState = !inputRef.current.checked;

            if (eventDetail !== 1) {
                inputRef.current.checked = newState;
            }

            setIsChecked(newState);
        }
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
