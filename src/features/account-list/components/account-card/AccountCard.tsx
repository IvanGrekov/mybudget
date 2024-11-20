import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import EditIcon from 'components/icons/EditIcon';
import EyeIcon from 'components/icons/EyeIcon';
import RemoveIcon from 'components/icons/RemoveIcon';
import Menu from 'components/menu/Menu';
import MenuActionItem from 'components/menu/MenuActionItem';
import Typography from 'components/typography/Typography';
import DeleteAccountModal from 'features/account-list/components/delete-account-modal/DeleteAccountModal';
import { EAppRoutes } from 'types/appRoutes';
import { Account } from 'types/generated.types';

interface IAccountCardProps {
    account: Account;
}

export default function AccountCard({
    account,
}: IAccountCardProps): JSX.Element {
    const { push } = useRouter();

    const { id, type, name, balance, currency } = account;

    const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);

    return (
        <>
            <Card>
                <CardHeader
                    title={<CardTitle title={name} />}
                    actions={
                        <Menu tooltipPosition="bottom-left">
                            <MenuActionItem
                                text="Details"
                                Icon={EyeIcon}
                                onClick={() =>
                                    push(`${EAppRoutes.Accounts}/${id}`)
                                }
                            />
                            <MenuActionItem
                                text="Edit"
                                isDisabled={true}
                                Icon={EditIcon}
                            />
                            <MenuActionItem
                                text="Delete"
                                Icon={RemoveIcon}
                                onClick={() => setIsDeletingModalOpen(true)}
                            />
                        </Menu>
                    }
                />
                <CardContent>
                    <Typography variant="subtitle2">
                        Balance: {balance} {currency}
                    </Typography>
                </CardContent>
            </Card>

            <DeleteAccountModal
                id={id}
                type={type}
                name={name}
                isOpen={isDeletingModalOpen}
                onClose={() => setIsDeletingModalOpen(false)}
            />
        </>
    );
}
