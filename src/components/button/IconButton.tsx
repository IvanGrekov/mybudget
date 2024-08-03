import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import styles from 'components/button/IconButton.module.scss';
import { IIconButtonProps } from 'components/button/types/buttonProps';

function IconButton(
    {
        Icon,
        title,
        isDisabled,
        isActive,
        tabIndex,
        iconSize,
        variant,
        className,
        onClick,
    }: IIconButtonProps,
    ref: Ref<HTMLButtonElement>,
): JSX.Element {
    return (
        <button
            ref={ref}
            title={title}
            onClick={onClick}
            disabled={isDisabled}
            tabIndex={tabIndex}
            className={cx(
                styles['icon-button'],
                styles[`icon-button--${variant}`],
                {
                    [styles['icon-button--active']]: isActive,
                    [styles['icon-button--disabled']]: isDisabled,
                },
                className,
            )}
        >
            <Icon size={iconSize} />
        </button>
    );
}

export default forwardRef(IconButton);
