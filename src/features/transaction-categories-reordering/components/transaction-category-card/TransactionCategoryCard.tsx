import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import DragDropListItem from 'components/drag-drop-list-item/DragDropListItem';
import DragIcon from 'components/icons/DragIcon';
import { TransactionCategory } from 'types/generated.types';

interface ITransactionCategoryCardProps {
    transactionCategory: TransactionCategory;
    isLoading: boolean;
}

export default function TransactionCategoryCard({
    transactionCategory,
    isLoading,
}: ITransactionCategoryCardProps): JSX.Element {
    const { name, id } = transactionCategory;

    return (
        <DragDropListItem id={id} isLoading={isLoading}>
            <Card>
                <CardHeader
                    title={<CardTitle title={name} />}
                    actions={<DragIcon />}
                    shouldHideBorder={true}
                />
            </Card>
        </DragDropListItem>
    );
}
