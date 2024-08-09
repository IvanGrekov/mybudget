interface IAccountDetailsProps {
    accountId: string;
}

export default function AccountDetails({
    accountId,
}: IAccountDetailsProps): JSX.Element {
    return <div>AccountDetails - {accountId}</div>;
}
