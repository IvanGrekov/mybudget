// import DragIcon from 'components/icons/DragIcon';
import Tooltip from 'components/tooltip/Tooltip';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-categories-reordering/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { TransactionCategory } from 'types/generated.types';

interface ISubcategoriesProps {
    subcategories: TransactionCategory[];
}

export default function Subcategories({
    subcategories,
}: ISubcategoriesProps): JSX.Element {
    return (
        <ul className={styles.subcategories}>
            {subcategories.map(({ id, name }) => (
                <li key={id} className={styles.subcategory}>
                    <Tooltip text={name}>
                        <Typography
                            variant="subtitle2"
                            element="h4"
                            lineClamp={1}
                            className={styles.title}
                        >
                            {name}
                        </Typography>
                    </Tooltip>

                    {/* <DragIcon size={30} /> */}
                </li>
            ))}
        </ul>
    );
}
