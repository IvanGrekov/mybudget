import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import DragDropListItem from 'components/drag-drop-list-item/DragDropListItem';
import DragIcon from 'components/icons/DragIcon';
import { Account } from 'types/generated.types';

interface IAccountCardProps {
    account: Account;
    isLoading: boolean;
}

export default function AccountCard({
    account,
    isLoading,
}: IAccountCardProps): JSX.Element {
    const { name, id } = account;

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
