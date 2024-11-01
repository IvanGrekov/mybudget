import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import IconButton from 'components/button/IconButton';
import styles from 'components/chip/Chip.module.scss';
import { IChipProps } from 'components/chip/types/chipProps';
import CloseIcon from 'components/icons/CloseIcon';
import Typography from 'components/typography/Typography';

function Chip(
    {
        title,
        variant = 'contained',
        size = 'regular',
        titleVariant,
        buttonTabIndex = 0,
        className,
        children,
        onDelete,
    }: IChipProps,
    ref: Ref<HTMLDivElement>,
): JSX.Element {
    return (
        <div
            ref={ref}
            className={cx(
                styles.chip,
                styles[`chip--${variant}`],
                styles[`chip--${size}`],
                className,
            )}
        >
            <Typography
                element="span"
                variant={titleVariant}
                className={styles.text}
            >
                {title}
            </Typography>

            {children && (
                <div className={styles['children-wrapper']}>{children}</div>
            )}

            {onDelete && (
                <IconButton
                    Icon={CloseIcon}
                    iconSize={15}
                    variant="overlayed"
                    tabIndex={buttonTabIndex}
                    className={styles['delete-button']}
                    onClick={onDelete}
                />
            )}
        </div>
    );
}

export default forwardRef(Chip);
