// import Button from 'components/button/Button';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardTitle from 'components/card/CardTitle';
import Typography from 'components/typography/Typography';
import { useIsMobile } from 'hooks/screenSize.hooks';
import { Transaction } from 'types/generated.types';

interface ITransactionCardProps {
    transaction: Transaction;
}

export default function TransactionCard({
    transaction,
}: ITransactionCardProps): JSX.Element {
    const isMobile = useIsMobile();
    const { value, currency } = transaction;

    return (
        <Card>
            <CardContent>
                <div>
                    <CardTitle
                        title={String(value)}
                        variant={isMobile ? 'body2' : 'body1'}
                    />
                    <Typography variant={isMobile ? 'caption' : 'body2'}>
                        Currency: {currency}
                    </Typography>
                </div>

                {/* <Button
                    text="Details"
                    href={`${EAppRoutes.TransactionCategories}/${id}`}
                /> */}
            </CardContent>
        </Card>
    );
}
