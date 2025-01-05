import { PropsWithChildren } from 'react';

import styles from 'features/transaction-form-modal/components/create-transaction-form-content/CreateTransactionFormContent.module.scss';
import TransactionCurrency from 'features/transaction-form-modal/components/create-transaction-form-content/TransactionCurrency';

export default function TransactionCurrencyContainer({
    children,
}: PropsWithChildren): JSX.Element {
    return (
        <div className={styles['currency-container']}>
            {children}
            <TransactionCurrency />
        </div>
    );
}
