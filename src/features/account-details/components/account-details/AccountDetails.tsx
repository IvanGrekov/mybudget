import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';

interface IAccountDetailsProps {
    accountId: string;
}

export default function AccountDetails({
    accountId,
}: IAccountDetailsProps): JSX.Element {
    return (
        <>
            <UnderDevelopmentMessage />
            <div>AccountDetails - {accountId}</div>
        </>
    );
}
