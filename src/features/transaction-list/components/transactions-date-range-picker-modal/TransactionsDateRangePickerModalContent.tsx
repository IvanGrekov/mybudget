import { DateRangePicker } from 'react-date-range';

import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { ITransactionsDateRangePickerModalData } from 'features/transaction-list/components/transactions-date-range-picker-modal/types/transactionsDateRangePickerModalData';

export default function TransactionsDateRangePickerModalContent({
    dateRange,
    onChange,
}: ITransactionsDateRangePickerModalData): JSX.Element {
    return (
        <>
            <UnderDevelopmentMessage />
            <DateRangePicker
                ranges={[dateRange]}
                maxDate={new Date()}
                inputRanges={[]}
                onChange={onChange}
            />
        </>
    );
}
