import { Range, RangeKeyDict } from 'react-date-range';

export interface ITransactionsDateRangePickerModalData {
    dateRange: Range;
    onChange: (dateRange: RangeKeyDict) => void;
}
