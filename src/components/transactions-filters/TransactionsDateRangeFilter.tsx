import { DateRange } from 'react-date-range';

import TransactionsDateRangePickerModal from 'components/transactions-filters/TransactionsDateRangePickerModal';
import styles from 'components/transactions-filters/TransactionsFilters.module.scss';
import { useDateRangeFilter } from 'components/transactions-filters/hooks/useDateRangeFilter';

export default function TransactionsDateRangeFilter(): JSX.Element {
    const {
        dateRange,
        dateRangeRef,
        isDateRangePickerModalOpen,
        onChange,
        closeDateRangePickerModal,
    } = useDateRangeFilter();

    return (
        <>
            <DateRange
                ranges={[dateRange]}
                showPreview={false}
                showMonthAndYearPickers={false}
                showMonthArrow={false}
                ref={dateRangeRef}
                classNames={{
                    dateDisplayWrapper: styles['date-range-preview-wrapper'],
                    dateDisplay: styles['date-range-preview-date'],
                    dateDisplayItem: styles['date-range-preview-item'],
                    monthAndYearWrapper:
                        styles['month-year-wrapper-date-range-preview'],
                    months: styles['months-date-range-preview'],
                }}
            />

            <TransactionsDateRangePickerModal
                isOpen={isDateRangePickerModalOpen}
                dateRange={dateRange}
                onChange={onChange}
                onClose={closeDateRangePickerModal}
            />
        </>
    );
}
