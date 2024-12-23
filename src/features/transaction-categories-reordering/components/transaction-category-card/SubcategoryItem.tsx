import EntityIcon from 'components/entity-icon/EntityIcon';
import DragIcon from 'components/icons/DragIcon';
import Tooltip from 'components/tooltip/Tooltip';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-categories-reordering/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { TransactionCategory } from 'types/generated.types';

interface ISampleComponentProps {
    subcategory: TransactionCategory;
}

export default function SubcategoryItem({
    subcategory,
}: ISampleComponentProps): JSX.Element {
    const { id, name, iconName, iconColor } = subcategory;

    return (
        <div className={styles.subcategory}>
            <EntityIcon
                iconName={iconName}
                iconColor={iconColor}
                isCategory={true}
            />

            <Tooltip text={name}>
                <Typography
                    variant="subtitle2"
                    element="h4"
                    lineClamp={1}
                    className={styles.title}
                >
                    {`${id}${name}`}
                </Typography>
            </Tooltip>

            <DragIcon size={30} wrapperClassName={styles['drag-icon']} />
        </div>
    );
}
