import { useRef, useState, useEffect } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import TransactionsDateRangePickerModal from 'features/transaction-list/components/transactions-date-range-picker-modal/TransactionsDateRangePickerModal';
import styles from 'features/transaction-list/components/transactions-filters/TransactionsFilters.module.scss';
import { useModal } from 'hooks/useModal';

const KEY = 'selection';
const DEFAULT_DATE_RANGE: Range = {
    startDate: undefined,
    endDate: new Date(),
    key: KEY,
};

export default function TransactionsDateRangeFilter(): JSX.Element {
    const dateRangeRef = useRef(null);
    const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);

    const { isModalOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        const clickHandler = (e: MouseEvent): void => {
            if (e.target instanceof HTMLInputElement) {
                openModal();
            }
        };

        document.addEventListener('click', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
        };
    }, [openModal]);

    const handleDateRangeSelect = (input: RangeKeyDict): void => {
        const newDateRange = input[KEY] as Range | undefined;

        if (!newDateRange) {
            return setDateRange(DEFAULT_DATE_RANGE);
        }

        setDateRange(newDateRange);
    };

    const isEndDateToday =
        dateRange.endDate?.toDateString() === new Date().toDateString();

    // eslint-disable-next-line no-console
    console.log('isEndDateToday', isEndDateToday);

    // TODO: Implement the date range filter

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
                isOpen={isModalOpen}
                dateRange={dateRange}
                onChange={handleDateRangeSelect}
                onClose={closeModal}
            />
        </>
    );
}
