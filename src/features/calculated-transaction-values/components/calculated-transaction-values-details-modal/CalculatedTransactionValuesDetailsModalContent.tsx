import DefaultModalContainer from 'components/modal/DefaultModalContainer';
import styles from 'features/calculated-transaction-values/components/calculated-transaction-values-details-modal/CalculatedTransactionValuesDetailsModalContent.module.scss';
import { ICalculatedTransactionValuesDetailsModalData } from 'features/calculated-transaction-values/components/calculated-transaction-values-details-modal/types/calculatedTransactionValuesDetailsModalData';
import CalculatedTransactionValuesItem from 'features/calculated-transaction-values/components/calculated-transaction-values-item/CalculatedTransactionValuesItem';
import DateLabels from 'features/calculated-transaction-values/components/date-labels/DateLabels';

export default function CalculatedTransactionValuesDetailsModalContent({
    fromDateLabel,
    toDateLabel,
    mainCurrency,
    data,
    considerToAsExpense,
    considerFromAsIncome,
}: Pick<
    ICalculatedTransactionValuesDetailsModalData,
    | 'fromDateLabel'
    | 'toDateLabel'
    | 'data'
    | 'mainCurrency'
    | 'considerToAsExpense'
    | 'considerFromAsIncome'
>): JSX.Element {
    const { from, to } = data;

    return (
        <DefaultModalContainer className={styles.container}>
            <DateLabels
                fromDateLabel={fromDateLabel}
                toDateLabel={toDateLabel}
                className={styles['date-labels']}
            />

            <div className={styles['calculated-transaction-value-items']}>
                <div
                    className={
                        styles['calculated-transaction-value-item-wrapper']
                    }
                >
                    <CalculatedTransactionValuesItem
                        value={from?.overall}
                        currency={mainCurrency}
                        title="from"
                        considerFromAsIncome={considerFromAsIncome}
                    />
                </div>

                <div
                    className={
                        styles['calculated-transaction-value-item-wrapper']
                    }
                >
                    <CalculatedTransactionValuesItem
                        value={to?.overall}
                        currency={mainCurrency}
                        title="to"
                        considerToAsExpense={considerToAsExpense}
                    />
                </div>
            </div>
        </DefaultModalContainer>
    );
}
