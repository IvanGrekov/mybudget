import { Range } from 'react-date-range';

import { DATE_RANGE_KEY } from 'features/transaction-list/components/transactions-filters/constants/dateRangeKey';

export const getDefaultDateRange = (): Range => {
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    return {
        startDate: undefined,
        endDate,
        key: DATE_RANGE_KEY,
    };
};
