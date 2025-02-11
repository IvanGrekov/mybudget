import { Range } from 'react-date-range';

import { DATE_RANGE_KEY } from 'components/transactions-filters/constants/dateRangeKey';
import {
    convertDateFromSearchParamValueToDate,
    convertDateToSearchParamValueToDate,
} from 'utils/dateRangeConvertersToSearchParams.utils';

export const getDefaultDateRange = (): Range => {
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    return {
        startDate: undefined,
        endDate,
        key: DATE_RANGE_KEY,
    };
};

type TGetInitDateRangeFromSearchParams = (args: {
    from?: string;
    to?: string;
}) => Range;

export const getInitDateRangeFromSearchParams: TGetInitDateRangeFromSearchParams =
    ({ from, to }) => {
        if (!from || !to) {
            return getDefaultDateRange();
        }

        return {
            startDate: convertDateFromSearchParamValueToDate(from),
            endDate: convertDateToSearchParamValueToDate(to),
            key: DATE_RANGE_KEY,
        };
    };
