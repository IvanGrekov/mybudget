import cx from 'classnames';

import styles from 'components/skeleton/Skeleton.module.scss';

interface ISkeletonProps {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export default function Skeleton({
    width = '100%',
    height = '1rem',
    className,
}: ISkeletonProps): JSX.Element {
    return (
        <div
            className={cx(styles.skeleton, className)}
            style={{ width, height }}
        />
    );
}
