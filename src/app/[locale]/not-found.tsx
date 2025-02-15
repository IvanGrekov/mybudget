import cx from 'classnames';

import styles from 'app/[locale]/not-found.module.scss';
import Divider from 'components/divider/Divider';
import Typography from 'components/typography/Typography';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

export default function NotFoundPage(): JSX.Element {
    const [title] = useGetFeatureTranslations({ featureName: 'NotFound' });

    return (
        <div className={cx(styles['not-found-wrapper'])}>
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
                <Typography variant="subtitle1">{title}</Typography>
            </div>
        </div>
    );
}
