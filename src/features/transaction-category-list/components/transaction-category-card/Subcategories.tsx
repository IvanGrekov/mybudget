import Button from 'components/button/Button';
import Tooltip from 'components/tooltip/Tooltip';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { useIsMobile } from 'hooks/screenSize.hooks';
import { EAppRoutes } from 'types/appRoutes';
import { TransactionCategory } from 'types/generated.types';

interface ISubcategoriesProps {
    subcategories: TransactionCategory[];
}

export default function Subcategories({
    subcategories,
}: ISubcategoriesProps): JSX.Element {
    const isMobile = useIsMobile();

    return (
        <ul className={styles.subcategories}>
            {subcategories.map(({ id, name }) => (
                <li key={id} className={styles.subcategory}>
                    <Tooltip text={name}>
                        <Typography
                            variant={isMobile ? 'body1' : 'subtitle2'}
                            element="h4"
                            lineClamp={1}
                            className={styles.title}
                        >
                            {name}
                        </Typography>
                    </Tooltip>

                    <Button
                        text="Details"
                        href={`${EAppRoutes.TransactionCategories}/${id}`}
                    />
                </li>
            ))}
        </ul>
    );
}
