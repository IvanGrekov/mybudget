'use client';

import cx from 'classnames';

import styles from 'components/tooltip/Tooltip.module.scss';
import { useTooltip } from 'components/tooltip/hooks/useTooltip';
import { ITooltipProps } from 'components/tooltip/types/tooltipProps';
import Typography from 'components/typography/Typography';

export default function Tooltip({
    children,
    text,
    className,
    wrapperClassName,
    position = 'top',
    open = true,
    openDelay,
}: ITooltipProps): JSX.Element {
    const { isOpen, childWithRef, tooltipTextRef } = useTooltip({
        children,
        open,
        openDelay,
    });

    return (
        <div className={cx(styles.tooltip, wrapperClassName)}>
            {childWithRef}

            <div
                ref={tooltipTextRef}
                className={cx(
                    styles.text,
                    styles[`text--${position}`],
                    {
                        [styles['text--open']]: isOpen,
                    },
                    className,
                )}
            >
                <Typography element="span" variant="body2">
                    {text}
                </Typography>
            </div>
        </div>
    );
}
