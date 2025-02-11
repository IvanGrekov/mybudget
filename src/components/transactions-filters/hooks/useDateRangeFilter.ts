import { useRef, useState, useEffect, MutableRefObject } from 'react';
import { Range, RangeKeyDict, DateRange } from 'react-date-range';

import { DATE_RANGE_KEY } from 'components/transactions-filters/constants/dateRangeKey';
import {
    getDefaultDateRange,
    getInitDateRangeFromSearchParams,
} from 'components/transactions-filters/utils/defaultDateRange.utils';
import {
    TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME,
    TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME,
} from 'constants/transactionListFilterParams.constants';
import { useGetSetSearchParamsValue } from 'hooks/searchParams.hooks';
import { useTransactionListFilterValues } from 'hooks/transactionListFilters.hooks';
import { useModal } from 'hooks/useModal';
import {
    convertDateToDateFromSearchParam,
    convertDateToDateToSearchParam,
} from 'utils/dateRangeConvertersToSearchParams.utils';

const useHandleDateRangeInputsClick = (openModal: VoidFunction): void => {
    useEffect(() => {
        const clickHandler = (e: MouseEvent): void => {
            if (e.target instanceof HTMLInputElement) {
                openModal();
            }
        };

        document.addEventListener('click', clickHandler);

        return (): void => {
            document.removeEventListener('click', clickHandler);
        };
    }, [openModal]);
};

interface IUseDateRangeFilterResult {
    dateRange: Range;
    dateRangeRef: MutableRefObject<DateRange | null>;
    isDateRangePickerModalOpen: boolean;
    onChange: (input: RangeKeyDict) => void;
    closeDateRangePickerModal: VoidFunction;
}

export const useDateRangeFilter = (): IUseDateRangeFilterResult => {
    const dateRangeRef = useRef<DateRange | null>(null);

    const { from, to } = useTransactionListFilterValues();

    const [dateRange, setDateRange] = useState(
        getInitDateRangeFromSearchParams({ from, to }),
    );

    const setSearchParamsValue = useGetSetSearchParamsValue();

    const { isModalOpen, openModal, closeModal } = useModal();

    useHandleDateRangeInputsClick(openModal);

    useEffect(() => {
        if (!dateRangeRef.current) {
            return;
        }

        if (!from && !to) {
            setDateRange(getDefaultDateRange());
        }
    }, [from, to]);

    const onChange = (input: RangeKeyDict): void => {
        let newDateRange = input[DATE_RANGE_KEY] as Range | undefined;

        if (!newDateRange) {
            newDateRange = getDefaultDateRange();
        }

        setDateRange(newDateRange);
    };

    const closeDateRangePickerModal = (): void => {
        const { startDate, endDate } = dateRange;

        setSearchParamsValue({
            [TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME]:
                convertDateToDateFromSearchParam(startDate),
            [TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME]:
                convertDateToDateToSearchParam(endDate),
        });
        closeModal();
    };

    return {
        dateRange,
        dateRangeRef,
        isDateRangePickerModalOpen: isModalOpen,
        onChange,
        closeDateRangePickerModal,
    };
};
