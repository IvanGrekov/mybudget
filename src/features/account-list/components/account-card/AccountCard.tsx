import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import EntityIcon from 'components/entity-icon/EntityIcon';
import Typography from 'components/typography/Typography';
import EditAccountModal from 'features/account-form-modal/components/edit-account-modal/EditAccountModal';
import ChangeAccountCurrencyModal from 'features/change-account-currency-modal/components/change-account-currency-modal/ChangeAccountCurrencyModal';
import DeleteAccountModal from 'features/delete-account-modal/components/delete-account-modal/DeleteAccountModal';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
import { useModal } from 'hooks/useModal';
import { EAppRoutes } from 'types/appRoutes';
import { Account } from 'types/generated.types';
import { roundValue } from 'utils/roundValue';

interface IAccountCardProps {
    account: Account;
}

export default function AccountCard({
    account,
}: IAccountCardProps): JSX.Element {
    const {
        isModalOpen: isEditAccountModalOpen,
        openModal: openEditAccountModal,
        closeModal: closeEditAccountModal,
    } = useModal();
    const {
        isModalOpen: isChangeCurrencyModalOpen,
        openModal: openChangeCurrencyModal,
        closeModal: closeChangeCurrencyModal,
    } = useModal();
    const {
        isModalOpen: isDeleteModalOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
    } = useModal();

    const balanceText = useGetEntityNameTranslations()('balance');

    const { id, type, name, balance, currency, iconName, iconColor } = account;

    return (
        <>
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
                    actions={
                        <BaseEntityMenu
                            detailsPath={`${EAppRoutes.Accounts}/${id}`}
                            openEditModal={openEditAccountModal}
                            openChangeCurrencyModal={openChangeCurrencyModal}
                            openDeleteModal={openDeleteModal}
                        />
                    }
                />
                <CardContent>
                    <Typography variant="subtitle2">
                        {balanceText}: {roundValue(balance)} {currency}
                    </Typography>
                </CardContent>
            </Card>

            <EditAccountModal
                account={account}
                isOpen={isEditAccountModalOpen}
                onClose={closeEditAccountModal}
            />

            <ChangeAccountCurrencyModal
                id={id}
                type={type}
                name={name}
                currency={currency}
                isOpen={isChangeCurrencyModalOpen}
                onClose={closeChangeCurrencyModal}
            />

            <DeleteAccountModal
                id={id}
                type={type}
                name={name}
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
            />
        </>
    );
}
