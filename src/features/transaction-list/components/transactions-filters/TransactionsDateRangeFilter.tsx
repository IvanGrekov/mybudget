import { useRef, useState, useEffect } from 'react';
import {
    DateRange,
    DateRangePicker,
    Range,
    RangeKeyDict,
} from 'react-date-range';

import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import styles from 'features/transaction-list/components/transactions-filters/TransactionsFilters.module.scss';

const KEY = 'selection';
const DEFAULT_DATE_RANGE: Range = {
    startDate: undefined,
    endDate: new Date(),
    key: KEY,
};

export default function TransactionsDateRangeFilter(): JSX.Element {
    const dateRangeRef = useRef(null);
    const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);

    useEffect(() => {
        const clickHandler = (e: MouseEvent): void => {
            if (e.target instanceof HTMLInputElement) {
                // eslint-disable-next-line no-console
                console.log('e.target', e.target);
            }
        };

        document.addEventListener('click', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
        };
    }, [dateRange]);

    const handleSelect = (input: RangeKeyDict): void => {
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
            <UnderDevelopmentMessage />

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
            <DateRangePicker
                ranges={[dateRange]}
                maxDate={new Date()}
                inputRanges={[]}
                onChange={handleSelect}
            />
        </>
    );
}
