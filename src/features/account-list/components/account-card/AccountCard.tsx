import Button from 'components/button/Button';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import Typography from 'components/typography/Typography';
import { EAppRoutes } from 'types/appRoutes';
import { Account } from 'types/generated.types';

interface IAccountCardProps {
    account: Account;
}

export default function AccountCard({
    account,
}: IAccountCardProps): JSX.Element {
    const { id, name, balance, currency } = account;

    return (
        <Card>
            <CardHeader
                title={<CardTitle title={name} />}
                actions={
                    <Button
                        text="Details"
                        href={`${EAppRoutes.Accounts}/${id}`}
                    />
                }
            />
            <CardContent>
                <Typography variant="subtitle2">
                    Balance: {balance} {currency}
                </Typography>
            </CardContent>
        </Card>
    );
}
