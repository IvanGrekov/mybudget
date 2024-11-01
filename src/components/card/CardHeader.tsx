import cx from 'classnames';

import styles from 'components/card/Card.module.scss';
import Show from 'components/show/Show';

interface ICardHeaderProps {
    title: JSX.Element;
    actions?: JSX.Element;
    className?: string;
}

export default function CardHeader({
    title,
    actions,
    className,
}: ICardHeaderProps): JSX.Element {
    return (
        <header className={cx(styles['card-header'], className)}>
            {title}

            <Show when={!!actions}>
                <div className={styles['card-header-actions']}>{actions}</div>
            </Show>
        </header>
    );
}
