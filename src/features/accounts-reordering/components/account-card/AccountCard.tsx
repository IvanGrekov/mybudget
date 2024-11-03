import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import { Account } from 'types/generated.types';

interface IAccountCardProps {
    account: Account;
}

export default function AccountCard({
    account,
}: IAccountCardProps): JSX.Element {
    const { name } = account;

    return (
        <Card>
            <CardHeader
                title={<CardTitle title={name} />}
                // actions={
                //     <Button
                //         text="Details"
                //         href={`${EAppRoutes.Accounts}/${id}`}
                //     />
                // }
            />
        </Card>
    );
}
