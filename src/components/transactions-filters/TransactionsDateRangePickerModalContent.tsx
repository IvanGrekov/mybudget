import { DateRangePicker } from 'react-date-range';

import DefaultModalContainer from 'components/modal/DefaultModalContainer';
import styles from 'components/transactions-filters/TransactionsDateRangePickerModal.module.scss';
import { ITransactionsDateRangePickerModalData } from 'components/transactions-filters/types/transactionsDateRangePickerModalData';

export default function TransactionsDateRangePickerModalContent({
    dateRange,
    onChange,
}: ITransactionsDateRangePickerModalData): JSX.Element {
    return (
        <DefaultModalContainer className={styles.container}>
            <DateRangePicker
                ranges={[dateRange]}
                maxDate={new Date()}
                inputRanges={[]}
                onChange={onChange}
            />
        </DefaultModalContainer>
    );
}
