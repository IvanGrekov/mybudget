import cx from 'classnames';

import styles from 'components/divider/Divider.module.scss';
import { IDividerProps } from 'components/divider/types/dividerProps';

export default function Divider({
    className,
    size = 1,
    isMinorColor,
    isMiddleColor,
    isVertical,
}: IDividerProps): JSX.Element {
    return (
        <div
            className={cx(
                styles.divider,
                {
                    [styles['divider--minorColor']]: isMinorColor,
                    [styles['divider--middleColor']]: isMiddleColor,
                    [styles['divider--vertical']]: isVertical,
                },
                className,
            )}
            style={{
                height: isVertical ? undefined : size,
                width: isVertical ? size : undefined,
            }}
        />
    );
}
