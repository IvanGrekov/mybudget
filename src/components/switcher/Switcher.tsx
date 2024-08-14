import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/switcher/Switcher.module.scss';
import Tooltip from 'components/tooltip/Tooltip';
import { TTooltipPosition } from 'components/tooltip/types/tooltipProps';

export interface ISwitcherProps extends PropsWithChildren {
    tooltipText: string;
    tooltipPosition: TTooltipPosition;
    isShifted: boolean;
    onClick: VoidFunction;
}

export default function Switcher({
    children,
    tooltipText,
    tooltipPosition,
    isShifted,
    onClick,
}: ISwitcherProps): JSX.Element {
    return (
        <Tooltip text={tooltipText} position={tooltipPosition}>
            <button className={styles.container} onClick={onClick}>
                {children}

                <span
                    className={cx(styles.switcher, {
                        [styles['switcher--shifted']]: isShifted,
                    })}
                />
            </button>
        </Tooltip>
    );
}
