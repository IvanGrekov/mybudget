import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { Account } from 'types/generated.types';

interface IAccountDetailsProps {
    account: Account;
}

export default function AccountDetails({
    account,
}: IAccountDetailsProps): JSX.Element {
    account;

    return (
        <>
            <UnderDevelopmentMessage />
        </>
    );
}
