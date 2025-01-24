import { useRef, useState, useEffect } from 'react';
import { DateRange, Range } from 'react-date-range';

import styles from 'features/transaction-list/components/transactions-filters/TransactionsFilters.module.scss';

const KEY = 'selection';
const DEFAULT_DATE_RANGE: Range = {
    startDate: undefined,
    endDate: new Date(),
    key: KEY,
};

export default function TransactionsDateRangeFilter(): JSX.Element {
    const dateRangeRef = useRef(null);
    const [dateRange] = useState(DEFAULT_DATE_RANGE);

    useEffect(() => {
        const clickHandler = (e: MouseEvent): void => {
            if (e.target instanceof HTMLInputElement) {
                console.log('e.target', e.target);
            }
        };

        document.addEventListener('click', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
        };
    }, [dateRange]);

    const isEndDateToday =
        dateRange.endDate?.toDateString() === new Date().toDateString();

    console.log('isEndDateToday', isEndDateToday);

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
        </>
    );
}
