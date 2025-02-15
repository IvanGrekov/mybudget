'use client';

import Button from 'components/button/Button';
import AddIcon from 'components/icons/AddIcon';
import Spacing from 'components/spacing/Spacing';
import CalculatedTransactionValues from 'features/calculated-transaction-values/components/calculated-transaction-values/CalculatedTransactionValues';
import { ICalculatedTransactionValuesProps } from 'features/calculated-transaction-values/components/calculated-transaction-values/types/calculatedTransactionValuesProps';
import CreateTransactionModal from 'features/transaction-form-modal/components/create-transaction-modal/CreateTransactionModal';
import styles from 'features/transaction-list/components/entity-transaction-list/EntityTransactionList.module.scss';
import TransactionList from 'features/transaction-list/components/transaction-list/TransactionList';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import { useGetTransactions } from 'hooks/useGetTransactions';
import { useModal } from 'hooks/useModal';
import { Account, TransactionCategory } from 'types/generated.types';

interface IEntityTransactionListArgs
    extends Pick<
        ICalculatedTransactionValuesProps,
        'considerFromAsIncome' | 'considerToAsExpense'
    > {
    selectedAccount?: Account;
    selectedTransactionCategory?: TransactionCategory;
}

export default function EntityTransactionList({
    selectedAccount,
    selectedTransactionCategory,
    ...calculatedTransactionValuesProps
}: IEntityTransactionListArgs): JSX.Element {
    const selectedAccountId = selectedAccount?.id;
    const selectedCategoryId = selectedTransactionCategory?.id;

    const { transactions, isLoading, hasMore, next, refetch } =
        useGetTransactions({
            selectedAccountId,
            selectedCategoryId,
        });

    const { isModalOpen, openModal, closeModal } = useModal();

    const [addTransactionButtonText] = useGetFeatureTranslations({
        featureName: 'Transactions',
        keys: ['add_transaction'],
    });

    return (
        <>
            <Spacing xs={50} />

            <CalculatedTransactionValues
                mainCurrency={
                    selectedAccount?.currency ||
                    selectedTransactionCategory?.currency ||
                    ''
                }
                entityName={
                    selectedAccount?.name ||
                    selectedTransactionCategory?.name ||
                    ''
                }
                accountId={selectedAccountId}
                categoryId={selectedCategoryId}
                {...calculatedTransactionValuesProps}
            />

            <Spacing xs={50} />

            <div className={styles['create-button-wrapper']}>
                <Button
                    text={addTransactionButtonText}
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
