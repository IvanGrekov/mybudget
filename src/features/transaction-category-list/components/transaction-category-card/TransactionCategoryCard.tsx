import Button from 'components/button/Button';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardTitle from 'components/card/CardTitle';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard.module.scss';
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
            <CardContent className={styles.container}>
                <div className={styles.header}>
                    <CardTitle
                        title={name}
                        variant="body1"
                        className={styles.title}
                    />
                    <Typography variant="body2">
                        Currency: {currency}
                    </Typography>
                </div>

                <Button
                    text="Details"
                    href={`${EAppRoutes.TransactionCategories}/${id}`}
                />
            </CardContent>
        </Card>
    );
}
