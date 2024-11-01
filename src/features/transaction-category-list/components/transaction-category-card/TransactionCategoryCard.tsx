import Button from 'components/button/Button';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import Typography from 'components/typography/Typography';
import { EAppRoutes } from 'types/appRoutes';
import { TransactionCategory } from 'types/generated.types';

interface ITransactionCategoryCardProps {
    transactionCategory: TransactionCategory;
}

export default function TransactionCategoryCard({
    transactionCategory,
}: ITransactionCategoryCardProps): JSX.Element {
    const { id, name, currency } = transactionCategory;

    return (
        <Card>
            <CardHeader
                title={<CardTitle title={name} />}
                actions={
                    <Button
                        text="Details"
                        href={`${EAppRoutes.TransactionCategories}/${id}`}
                    />
                }
            />
            <CardContent>
                <Typography variant="body1">Currency: {currency}</Typography>
            </CardContent>
        </Card>
    );
}
