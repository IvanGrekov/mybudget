'use client';

import Button from 'components/button/Button';
import AddIcon from 'components/icons/AddIcon';
import Spacing from 'components/spacing/Spacing';
import CreateTransactionModal from 'features/transaction-form-modal/components/create-transaction-modal/CreateTransactionModal';
import styles from 'features/transaction-list/components/entity-transaction-list/EntityTransactionList.module.scss';
import TransactionList from 'features/transaction-list/components/transaction-list/TransactionList';
import { useGetTransactions } from 'hooks/useGetTransactions';
import { useModal } from 'hooks/useModal';
import { Account, TransactionCategory } from 'types/generated.types';

interface IEntityTransactionListArgs {
    selectedAccount?: Account;
    selectedTransactionCategory?: TransactionCategory;
}

export default function EntityTransactionList({
    selectedAccount,
    selectedTransactionCategory,
}: IEntityTransactionListArgs): JSX.Element {
    const selectedAccountId = selectedAccount?.id;
    const selectedCategoryId = selectedTransactionCategory?.id;

    const { transactions, isLoading, hasMore, next, refetch } =
        useGetTransactions({
            selectedAccountId,
            selectedCategoryId,
        });

    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <Spacing xs={60} />

            <div className={styles['create-button-wrapper']}>
                <Button
                    text="Add transaction"
                    Icon={AddIcon}
                    onClick={openModal}
                />
            </div>

            <Spacing xs={30} />

            <TransactionList
                transactions={transactions}
                hasMore={hasMore}
                isLoading={isLoading}
                selectedAccountId={selectedAccountId}
                selectedCategoryId={selectedCategoryId}
                next={next}
            />

            <CreateTransactionModal
                defaultAccount={selectedAccount}
                defaultTransactionCategory={selectedTransactionCategory}
                isOpen={isModalOpen}
                refetchTransactionList={refetch}
                onClose={closeModal}
            />
        </>
    );
}
