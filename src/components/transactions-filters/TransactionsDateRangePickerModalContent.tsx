import { DateRangePicker } from 'react-date-range';

import { useUserLanguageValue } from 'components/language-switcher/hooks/useUserLanguageValue';
import DefaultModalContainer from 'components/modal/DefaultModalContainer';
import styles from 'components/transactions-filters/TransactionsDateRangePickerModal.module.scss';
import { ITransactionsDateRangePickerModalData } from 'components/transactions-filters/types/transactionsDateRangePickerModalData';
import { DATE_FORMAT } from 'constants/dateFormat.constants';
import { DATE_FNS_LOCALES } from 'constants/locales';
import { useGetDateRangeFilterFeatureTranslations } from 'hooks/translations.hooks';

export default function TransactionsDateRangePickerModalContent({
    dateRange,
    onChange,
}: ITransactionsDateRangePickerModalData): JSX.Element {
    const { value } = useUserLanguageValue();
    const dateRangeTranslations = useGetDateRangeFilterFeatureTranslations();

    return (
        <DefaultModalContainer className={styles.container}>
            <DateRangePicker
                locale={DATE_FNS_LOCALES.get(value)}
                dateDisplayFormat={DATE_FORMAT}
                startDatePlaceholder={dateRangeTranslations('early')}
                endDatePlaceholder={dateRangeTranslations('today')}
                ranges={[dateRange]}
                maxDate={new Date()}
                inputRanges={[]}
                onChange={onChange}
            />
        </DefaultModalContainer>
    );
}
