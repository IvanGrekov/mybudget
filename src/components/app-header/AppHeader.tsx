import cx from 'classnames';

import styles from 'components/app-header/AppHeader.module.scss';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';

interface IAppHeaderProps {
    title?: string;
    subtitle?: string;
    actions?: JSX.Element;
    className?: string;
}

export default function AppHeader({
    title,
    subtitle,
    actions,
    className,
}: IAppHeaderProps): JSX.Element {
    return (
        <div className={cx(styles.header, className)}>
            <Show when={!!title}>
                <div className={styles['title-wrapper']}>
                    <Typography element="h2" variant="h4">
                        {title}
                    </Typography>

                    <Show when={!!actions}>{actions}</Show>
                </div>
            </Show>

            <Show when={!!subtitle}>
                <Typography element="p" variant="subtitle2">
                    {subtitle}
                </Typography>
            </Show>
        </div>
    );
}
