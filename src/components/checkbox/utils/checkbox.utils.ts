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
    nativeSelectRefCallback,
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

    const onLabelClick: IGetCheckboxHandlersResult['onLabelClick'] =
        nativeSelectRefCallback
            ? (e): void => {
                  if (inputRef.current) {
                      e.preventDefault();
                      const newState = !inputRef.current.checked;
                      onChange?.(newState);
                  }
              }
            : undefined;

    const onInputFocus: IGetCheckboxHandlersResult['onInputFocus'] = (e) => {
        buttonRef.current?.focus();
        onFocus?.(e);
    };

    const onInputBlur: IGetCheckboxHandlersResult['onInputBlur'] = (e) => {
        buttonRef.current?.blur();
        onBlur?.(e);
    };

    const onInputChange: IGetCheckboxHandlersResult['onInputChange'] = (e) => {
        onChange?.(e.currentTarget.checked);
    };

    const onButtonClick: IGetCheckboxHandlersResult['onButtonClick'] = (e) => {
        if (inputRef.current) {
            e.preventDefault();
            const newState = !inputRef.current.checked;
            onChange?.(newState);
        }
    };

    return {
        onLabelMouseEnter,
        onLabelMouseLeave,
        onLabelClick,
        onInputFocus,
        onInputBlur,
        onInputChange,
        onButtonClick,
    };
};
