import cx from 'classnames';
import { useTranslations } from 'next-intl';

import styles from 'app/[locale]/not-found.module.scss';
import Divider from 'components/divider/Divider';
import Typography from 'components/typography/Typography';

export default function NotFoundPage(): JSX.Element {
    const t = useTranslations('NotFound');

    return (
        <div
            className={cx(
                styles['not-found-wrapper'],
                styles['not-found-wrapper--full-screen-except-header'],
            )}
        >
            <div className={styles['not-found-text-wrapper']}>
                <Typography variant="h5" element="h2">
                    404
                </Typography>
                <Divider
                    isVertical={true}
                    isMiddleColor={true}
                    size={2}
                    className={styles['not-found-divider']}
                />
                <Typography variant="subtitle2">{t('title')}</Typography>
            </div>
        </div>
    );
}
