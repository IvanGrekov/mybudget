import styles from 'features/calculated-transaction-values/components/calculated-transaction-values/CalculatedTransactionValues.module.scss';
import { useGetCalculatedTransactionValues } from 'features/calculated-transaction-values/components/calculated-transaction-values/hooks/useGetCalculatedTransactionValues';
import { useGetDateRangeLabels } from 'features/calculated-transaction-values/components/calculated-transaction-values/hooks/useGetDateRangeLabels';
import { ICalculatedTransactionValuesProps } from 'features/calculated-transaction-values/components/calculated-transaction-values/types/calculatedTransactionValuesProps';
import CalculatedTransactionValuesItem from 'features/calculated-transaction-values/components/calculated-transaction-values-item/CalculatedTransactionValuesItem';
import DateLabels from 'features/calculated-transaction-values/components/date-labels/DateLabels';
import { useGetMe } from 'hooks/me.hooks';
import { useTransactionListFilterValues } from 'hooks/transactionListFilters.hooks';

export default function CalculatedTransactionValues({
    accountId,
    categoryId,
    considerFromAsIncome,
    considerToAsExpense,
}: ICalculatedTransactionValuesProps): JSX.Element | null {
    const { me } = useGetMe();
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

    if (!me || isLoading || (!data?.from && !data?.to)) {
        return null;
    }

    const { from, to } = data;
    const { defaultCurrency } = me;

    return (
        <div className={styles.container}>
            <div className={styles['calculated-transaction-values']}>
                <DateLabels
                    fromDateLabel={dateLabels?.fromDateLabel}
                    toDateLabel={dateLabels?.toDateLabel}
                />
                <div className={styles['calculated-transaction-value-items']}>
                    <CalculatedTransactionValuesItem
                        value={from?.overall}
                        currency={defaultCurrency}
                        title="from"
                        considerFromAsIncome={considerFromAsIncome}
                    />
                    <CalculatedTransactionValuesItem
                        value={to?.overall}
                        currency={defaultCurrency}
                        title="to"
                        considerToAsExpense={considerToAsExpense}
                    />
                </div>
            </div>
        </div>
    );
}
