import cx from 'classnames';

import styles from 'components/card/Card.module.scss';
import Show from 'components/show/Show';

interface ICardHeaderProps {
    title: JSX.Element;
    actions?: JSX.Element;
    className?: string;
    shouldHideBorder?: boolean;
}

export default function CardHeader({
    title,
    actions,
    className,
    shouldHideBorder,
}: ICardHeaderProps): JSX.Element {
    return (
        <header
            className={cx(styles['card-header'], className, {
                [styles['card-header--hide-border']]: shouldHideBorder,
            })}
        >
            {title}

            <Show when={!!actions}>
                <div className={styles['card-header-actions']}>{actions}</div>
            </Show>
        </header>
    );
}
