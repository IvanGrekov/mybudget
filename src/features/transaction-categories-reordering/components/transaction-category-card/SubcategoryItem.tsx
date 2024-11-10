import DragDropListItem from 'components/drag-drop-list-item/DragDropListItem';
import DragIcon from 'components/icons/DragIcon';
import Tooltip from 'components/tooltip/Tooltip';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-categories-reordering/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { TransactionCategory } from 'types/generated.types';

interface ISampleComponentProps {
    subcategory: TransactionCategory;
    isLoading: boolean;
}

export default function SubcategoryItem({
    subcategory,
    isLoading,
}: ISampleComponentProps): JSX.Element {
    const { name, id } = subcategory;

    return (
        <DragDropListItem id={id} isLoading={isLoading}>
            <div className={styles.subcategory}>
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

                <DragIcon size={30} />
            </div>
        </DragDropListItem>
    );
}
