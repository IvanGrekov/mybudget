import { DateRangePicker } from 'react-date-range';

import DefaultModalContainer from 'components/modal/DefaultModalContainer';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import styles from 'features/transaction-list/components/transactions-date-range-picker-modal/TransactionsDateRangePickerModal.module.scss';
import { ITransactionsDateRangePickerModalData } from 'features/transaction-list/components/transactions-date-range-picker-modal/types/transactionsDateRangePickerModalData';

export default function TransactionsDateRangePickerModalContent({
    dateRange,
    onChange,
}: ITransactionsDateRangePickerModalData): JSX.Element {
    return (
        <>
            <UnderDevelopmentMessage />

            <DefaultModalContainer className={styles.container}>
                <DateRangePicker
                    ranges={[dateRange]}
                    maxDate={new Date()}
                    inputRanges={[]}
                    onChange={onChange}
                />
            </DefaultModalContainer>
        </>
    );
}
