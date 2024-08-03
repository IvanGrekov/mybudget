import cx from 'classnames';

import styles from 'components/loader/Loader.module.scss';

interface ILoaderProps {
    size?: 'small' | 'big' | 'regular';
}

export default function Loader({
    size = 'regular',
}: ILoaderProps): JSX.Element {
    return (
        <div className={cx(styles.loader, styles[size])}>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
}
