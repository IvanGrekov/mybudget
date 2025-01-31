import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import AdditionalInfo from 'features/transaction-list/components/additional-info/AdditionalInfo';
import HeaderChips from 'features/transaction-list/components/header-chips/HeaderChips';
import styles from 'features/transaction-list/components/transaction-card/TransactionCard.module.scss';
import { Transaction } from 'types/generated.types';
import { roundValue } from 'utils/roundValue';

interface ITransactionCardHeaderProps {
    transaction: Transaction;
    openDetailsModal: VoidFunction;
    openEditModal: VoidFunction;
}

export default function TransactionCardHeader({
    transaction,
    openDetailsModal,
    openEditModal,
}: ITransactionCardHeaderProps): JSX.Element {
    const { createdAt, type, value, currency } = transaction;

    return (
        <CardHeader
            title={
                <div className={styles['header-title-wrapper']}>
                    <HeaderChips createdAt={createdAt} type={type} />

                    <CardTitle title={`${roundValue(value)} ${currency}`} />

                    <AdditionalInfo transaction={transaction} />
                </div>
            }
            actions={
                <BaseEntityMenu
                    openDetailsModal={openDetailsModal}
                    openEditModal={openEditModal}
                />
            }
        />
    );
}
