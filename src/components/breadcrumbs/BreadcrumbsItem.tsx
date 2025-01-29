import cx from 'classnames';

import styles from 'components/breadcrumbs/Breadcrumbs.module.scss';
import { IBreadcrumbsItem } from 'components/breadcrumbs/types/breadcrumbsItem';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';

export default function BreadcrumbsItem({
    label,
    href,
}: IBreadcrumbsItem): JSX.Element {
    if (!href) {
        return (
            <Typography className={cx(styles.item, styles['item-text'])}>
                {label}
            </Typography>
        );
    }

    return <Link href={href} text={label} className={styles.item} />;
}
