import styles from 'features/calculated-transaction-values/components/calculated-transaction-values/CalculatedTransactionValues.module.scss';
import { useGetCalculatedTransactionValues } from 'features/calculated-transaction-values/components/calculated-transaction-values/hooks/useGetCalculatedTransactionValues';
import { useGetDateRangeLabels } from 'features/calculated-transaction-values/components/calculated-transaction-values/hooks/useGetDateRangeLabels';
import { ICalculatedTransactionValuesProps } from 'features/calculated-transaction-values/components/calculated-transaction-values/types/calculatedTransactionValuesProps';
import CalculatedTransactionValuesDetailsModal from 'features/calculated-transaction-values/components/calculated-transaction-values-details-modal/CalculatedTransactionValuesDetailsModal';
import CalculatedTransactionValuesItem from 'features/calculated-transaction-values/components/calculated-transaction-values-item/CalculatedTransactionValuesItem';
import DateLabels from 'features/calculated-transaction-values/components/date-labels/DateLabels';
import { useTransactionListFilterValues } from 'hooks/transactionListFilters.hooks';
import { useModal } from 'hooks/useModal';

export default function CalculatedTransactionValues({
    mainCurrency,
    entityName,
    accountId,
    categoryId,
    considerFromAsIncome,
    considerToAsExpense,
}: ICalculatedTransactionValuesProps): JSX.Element | null {
    const { isModalOpen, openModal, closeModal } = useModal();

    const { from: fromDate, to: toDate } = useTransactionListFilterValues();

    const dateLabels = useGetDateRangeLabels({
        from: fromDate,
        to: toDate,
    });

    const { data, isLoading } = useGetCalculatedTransactionValues({
        accountId,
        categoryId,
        from: fromDate,
        to: toDate,
    });

    if (isLoading || (!data?.from && !data?.to)) {
        return null;
    }

    const { from, to } = data;

    return (
        <>
            <div className={styles.container}>
                <div
                    className={styles['calculated-transaction-values']}
                    onClick={openModal}
                >
                    <DateLabels
                        fromDateLabel={dateLabels?.fromDateLabel}
                        toDateLabel={dateLabels?.toDateLabel}
                    />
                    <div
                        className={styles['calculated-transaction-value-items']}
                    >
                        <CalculatedTransactionValuesItem
                            value={from?.overall}
                            currency={mainCurrency}
                            title="from"
                            considerFromAsIncome={considerFromAsIncome}
                        />
                        <CalculatedTransactionValuesItem
                            value={to?.overall}
                            currency={mainCurrency}
                            title="to"
                            considerToAsExpense={considerToAsExpense}
                        />
                    </div>
                </div>
            </div>

            <CalculatedTransactionValuesDetailsModal
                fromDateLabel={dateLabels?.fromDateLabel}
                toDateLabel={dateLabels?.toDateLabel}
                entityName={entityName}
                mainCurrency={mainCurrency}
                data={data}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
}
