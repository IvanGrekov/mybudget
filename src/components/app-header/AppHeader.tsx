import cx from 'classnames';

import styles from 'components/app-header/AppHeader.module.scss';
import Typography from 'components/typography/Typography';

interface IAppHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function AppHeader({
    title,
    subtitle,
    className,
}: IAppHeaderProps): JSX.Element {
    return (
        <div className={cx(styles.header, className)}>
            <Typography element="h2" variant="h3">
                {title}
            </Typography>

            {subtitle && (
                <Typography element="p" variant="subtitle2">
                    {subtitle}
                </Typography>
            )}
        </div>
    );
}
