import { DateRange } from 'react-date-range';

import { useUserLanguageValue } from 'components/language-switcher/hooks/useUserLanguageValue';
import TransactionsDateRangePickerModal from 'components/transactions-filters/TransactionsDateRangePickerModal';
import styles from 'components/transactions-filters/TransactionsFilters.module.scss';
import { useDateRangeFilter } from 'components/transactions-filters/hooks/useDateRangeFilter';
import { DATE_FORMAT } from 'constants/dateFormat.constants';
import { DATE_FNS_LOCALES } from 'constants/locales';
import { useGetDateRangeFilterFeatureTranslations } from 'hooks/translations.hooks';

export default function TransactionsDateRangeFilter(): JSX.Element {
    const {
        dateRange,
        dateRangeRef,
        isDateRangePickerModalOpen,
        onChange,
        closeDateRangePickerModal,
    } = useDateRangeFilter();

    const { value } = useUserLanguageValue();
    const dateRangeTranslations = useGetDateRangeFilterFeatureTranslations();

    return (
        <>
            <DateRange
                locale={DATE_FNS_LOCALES.get(value)}
                dateDisplayFormat={DATE_FORMAT}
                startDatePlaceholder={dateRangeTranslations('early')}
                endDatePlaceholder={dateRangeTranslations('today')}
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
