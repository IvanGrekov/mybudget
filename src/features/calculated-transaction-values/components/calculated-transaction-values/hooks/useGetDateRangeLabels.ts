import { useGetMyTimeZone } from 'hooks/me.hooks';
import { getDate } from 'utils/date.utils';
import {
    convertDateFromSearchParamValueToDate,
    convertDateToSearchParamValueToDate,
} from 'utils/dateRangeConvertersToSearchParams.utils';

type TUseGetDateRangeLabels = (args: { from?: string; to?: string }) => null | {
    fromDateLabel: string;
    toDateLabel: string;
};

export const useGetDateRangeLabels: TUseGetDateRangeLabels = ({ from, to }) => {
    const { timeZone } = useGetMyTimeZone();

    if (!from && !to) {
        return null;
    }

    const fromDate = convertDateFromSearchParamValueToDate(from);
    const toDate = convertDateToSearchParamValueToDate(to);

    const fromDateLabel = fromDate ? getDate(fromDate, timeZone) : 'Early';
    const toDateLabel = toDate ? getDate(toDate, timeZone) : 'Now';

    return {
        fromDateLabel,
        toDateLabel,
    };
};
