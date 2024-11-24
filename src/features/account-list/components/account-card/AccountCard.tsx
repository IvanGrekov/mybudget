import { useState } from 'react';

import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import Typography from 'components/typography/Typography';
import ChangeAccountCurrencyModal from 'features/account-list/components/change-currency-modal/ChangeAccountCurrencyModal';
import DeleteAccountModal from 'features/account-list/components/delete-account-modal/DeleteAccountModal';
import { EAppRoutes } from 'types/appRoutes';
import { Account } from 'types/generated.types';
import { roundValue } from 'utils/roundValue';

interface IAccountCardProps {
    account: Account;
}

export default function AccountCard({
    account,
}: IAccountCardProps): JSX.Element {
    const [isChangeCurrencyModalOpen, setIsChangeCurrencyModalOpen] =
        useState(false);
    const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);

    const { id, type, name, balance, currency } = account;

    return (
        <>
            <Card>
                <CardHeader
                    title={<CardTitle title={name} />}
                    actions={
                        <BaseEntityMenu
                            detailsPath={`${EAppRoutes.Accounts}/${id}`}
                            setIsChangeCurrencyModalOpen={
                                setIsChangeCurrencyModalOpen
                            }
                            setIsDeletingModalOpen={setIsDeletingModalOpen}
                        />
                    }
                />
                <CardContent>
                    <Typography variant="subtitle2">
                        Balance: {roundValue(balance)} {currency}
                    </Typography>
                </CardContent>
            </Card>

            <ChangeAccountCurrencyModal
                id={id}
                type={type}
                name={name}
                currency={currency}
                isOpen={isChangeCurrencyModalOpen}
                onClose={() => setIsChangeCurrencyModalOpen(false)}
            />

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
