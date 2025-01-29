import cx from 'classnames';

import styles from 'components/app-header/AppHeader.module.scss';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';

interface IAppHeaderProps {
    title?: string;
    titleEl?: JSX.Element;
    subtitle?: string;
    actions?: JSX.Element;
    className?: string;
}

export default function AppHeader({
    title,
    titleEl,
    subtitle,
    actions,
    className,
}: IAppHeaderProps): JSX.Element {
    return (
        <div className={cx(styles.header, className)}>
            <Show when={!!title || !!titleEl}>
                <div className={styles['main-row']}>
                    <div className={styles['title-wrapper']}>
                        {titleEl}

                        <Show when={!!title}>
                            <Typography element="h2" variant="h4">
                                {title}
                            </Typography>
                        </Show>
                    </div>

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
