import { MouseEvent } from 'react';

import CheckedSquareIcon from 'components/icons/CheckedSquareIcon';
import OutlinedSquareIcon from 'components/icons/OutlinedSquareIcon';
import { IIconProps } from 'components/icons/types/iconProps';
import {
    TGetOptionValue,
    TGetIsOptionSelected,
    TSelectProps,
    TGetOptionLabel,
} from 'components/select/types/select.types';

export const defaultGetOptionLabel = <T>(option: T): string => {
    return String(option);
};

export const defaultGetOptionValue = <T>(option: T): string => {
    return String(option);
};

export const getDefaultGetIsOptionSelected = <T>(
    getOptionValue?: TGetOptionValue<T>,
): TGetIsOptionSelected<T> => {
    return ({ option, value }) => {
        const optionValue = getOptionValue ? getOptionValue(option) : option;

        const isArray = Array.isArray(value);

        if (isArray) {
            return value.some((item) => item === optionValue);
        }

        return optionValue === value;
    };
};

type TGetMultipleSelectOptionItemIcon = (
    isSelected: boolean,
) => (props: IIconProps) => JSX.Element;

export const getMultipleSelectOptionItemIcon: TGetMultipleSelectOptionItemIcon =
    (isChecked) => {
        return isChecked ? CheckedSquareIcon : OutlinedSquareIcon;
    };

type IGetOnDeleteOptionArgs<T> = Pick<
    TSelectProps<T>,
    'options' | 'onChange'
> & {
    label: string;
    getOptionLabel: TGetOptionLabel<T>;
};

type TGetOnDeleteOptionResult = (e: MouseEvent<HTMLButtonElement>) => void;

export const getOnDeleteOptionByLabel = <T>({
    label,
    options,
    getOptionLabel,
    onChange,
}: IGetOnDeleteOptionArgs<T>): TGetOnDeleteOptionResult => {
    const option = options.find((option) => getOptionLabel(option) === label);

    return (e) => {
        e.stopPropagation();
        option && onChange(option);
    };
};
