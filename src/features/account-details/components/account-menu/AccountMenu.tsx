'use client';

import { useRouter } from 'next/navigation';

import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import { TAB_PARAM_NAME } from 'constants/tabParamName';
import EditAccountModal from 'features/account-form-modal/components/edit-account-modal/EditAccountModal';
import ChangeAccountCurrencyModal from 'features/change-account-currency-modal/components/change-account-currency-modal/ChangeAccountCurrencyModal';
import DeleteAccountModal from 'features/delete-account-modal/components/delete-account-modal/DeleteAccountModal';
import { useModal } from 'hooks/useModal';
import { EAppRoutes } from 'types/appRoutes';
import { Account } from 'types/generated.types';

interface IAccountMenuProps {
    account: Account;
}

export default function AccountMenu({
    account,
}: IAccountMenuProps): JSX.Element {
    const { push } = useRouter();

    const { id, type, name, currency } = account;

    const onDeactivate = (): void => {
        push(`${EAppRoutes.Accounts}?${TAB_PARAM_NAME}=${type}`);
    };

    const {
        isModalOpen: isEditModalOpen,
        openModal: openEditModal,
        closeModal: closeEditModal,
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

    return (
        <>
            <BaseEntityMenu
                openEditModal={openEditModal}
                openChangeCurrencyModal={openChangeCurrencyModal}
                openDeleteModal={openDeleteModal}
            />

            <EditAccountModal
                account={account}
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
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
                onCompleted={onDeactivate}
            />
        </>
    );
}
