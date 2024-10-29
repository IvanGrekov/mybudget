import Link from 'next/link';

import Card from 'components/card/Card';
import Typography from 'components/typography/Typography';
import { EAppRoutes } from 'types/appRoutes';
import { Account } from 'types/generated.types';

interface IAccountCardProps {
    account: Account;
}

export default function AccountCard({
    account,
}: IAccountCardProps): JSX.Element {
    const { id, name, currency } = account;

    return (
        <Link href={`${EAppRoutes.Accounts}/${id}`}>
            <Card>
                <Typography element="p" variant="body1">
                    {name} - {currency}
                </Typography>
            </Card>
        </Link>
    );
}
