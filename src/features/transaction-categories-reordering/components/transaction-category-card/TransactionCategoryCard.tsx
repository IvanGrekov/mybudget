import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import Divider from 'components/divider/Divider';
import DragIcon from 'components/icons/DragIcon';
import Show from 'components/show/Show';
import Subcategories, {
    SortableSubcategories,
} from 'features/transaction-categories-reordering/components/transaction-category-card/Subcategories';
import styles from 'features/transaction-categories-reordering/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { TransactionCategory } from 'types/generated.types';

interface ITransactionCategoryCardProps {
    transactionCategory: TransactionCategory;
    isLoading?: boolean;
    isDragging?: boolean;
}

export default function TransactionCategoryCard({
    transactionCategory,
    isLoading,
    isDragging,
}: ITransactionCategoryCardProps): JSX.Element {
    const { name, id, children } = transactionCategory;

    return (
        <Card>
            <CardHeader
                title={<CardTitle title={name} />}
                actions={<DragIcon />}
                shouldHideBorder={true}
            />

            <Show when={!!children.length}>
                <CardContent className={styles.content}>
                    <Divider />

                    {isDragging ? (
                        <Subcategories
                            subcategories={children}
                            isLoading={isLoading}
                            isDragging={isDragging}
                        />
                    ) : (
                        <SortableSubcategories
                            parentId={id}
                            subcategories={children}
                            isLoading={isLoading}
                        />
                    )}
                </CardContent>
            </Show>
        </Card>
    );
}
