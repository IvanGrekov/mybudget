import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import DragDropListItem from 'components/drag-drop-list-item/DragDropListItem';
import EntityIcon from 'components/entity-icon/EntityIcon';
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
    const { name, id, iconName, iconColor } = account;

    return (
        <DragDropListItem id={id} isLoading={isLoading}>
            <Card>
                <CardHeader
                    title={
                        <>
                            <EntityIcon
                                iconName={iconName}
                                iconColor={iconColor}
                            />
                            <CardTitle title={name} />
                        </>
                    }
                    actions={<DragIcon />}
                    shouldHideBorder={true}
                />
            </Card>
        </DragDropListItem>
    );
}
