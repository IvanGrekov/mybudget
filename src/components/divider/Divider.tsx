import cx from 'classnames';

import styles from 'components/divider/Divider.module.scss';
import { IDividerProps } from 'components/divider/types/dividerProps';

export default function Divider({
    className,
    size = 1,
    isMinorColor,
}: IDividerProps): JSX.Element {
    return (
        <div
            className={cx(
                styles.divider,
                {
                    [styles['divider--minorColor']]: isMinorColor,
                },
                className,
            )}
            style={{ height: size }}
        />
    );
}
