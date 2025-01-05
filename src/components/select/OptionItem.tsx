import { MouseEvent } from 'react';

import cx from 'classnames';

import styles from 'components/select/Select.module.scss';
import { TSelectProps } from 'components/select/types/select.types';
import {
    defaultGetOptionLabel,
    getDefaultGetIsOptionSelected,
    getMultipleSelectOptionItemIcon,
} from 'components/select/utils/optionItem.utils';
import Typography from 'components/typography/Typography';

type TOptionItemProps<T> = Pick<
    TSelectProps<T>,
    | 'value'
    | 'onChange'
    | 'multiple'
    | 'getOptionLabel'
    | 'getOptionReactNode'
    | 'getOptionValue'
    | 'getIsOptionDisabled'
    | 'getIsOptionHidden'
    | 'getIsOptionSelected'
> & {
    option: T;
};

export default function OptionItem<T>({
    option,
    value,
    multiple,
    onChange,
    getIsOptionHidden,
    getIsOptionDisabled,
    getOptionLabel = defaultGetOptionLabel,
    getOptionReactNode,
    getIsOptionSelected = getDefaultGetIsOptionSelected(),
}: TOptionItemProps<T>): JSX.Element | null {
    const isHidden = getIsOptionHidden?.(option);

    if (isHidden) {
        return null;
    }

    const isDisabled = getIsOptionDisabled?.(option);
    const isSelected = getIsOptionSelected({
        option,
        value,
    });
    const Icon = getMultipleSelectOptionItemIcon(isSelected);

    const onClick = (e: MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();

        if (isDisabled) {
            return;
        }

        onChange(option);
    };

    return (
        <button
            type="button"
            tabIndex={1}
            className={cx(styles['option-item'], {
                [styles['option-item--disabled']]: isDisabled,
                [styles['option-item--selected']]: isSelected,
            })}
            onClick={onClick}
        >
            {multiple && (
                <Icon
                    size={25}
                    wrapperClassName={cx(styles['option-item__multiple-icon'])}
                />
            )}
            {getOptionReactNode ? (
                getOptionReactNode(option)
            ) : (
                <Typography>{getOptionLabel(option)}</Typography>
            )}
        </button>
    );
}
