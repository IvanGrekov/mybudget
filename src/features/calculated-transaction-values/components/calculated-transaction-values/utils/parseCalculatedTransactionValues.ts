import {
    ICalculatedTransactionValues,
    ICalculatedTransactionValuesItem,
} from 'features/calculated-transaction-values/types/calculatedTransactionValues';
import { CalculatedTransactionValuesDto } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

export const parseCalculatedTransactionValues = (
    input: Maybe<CalculatedTransactionValuesDto>,
): Maybe<ICalculatedTransactionValues> => {
    if (!input) {
        return null;
    }

    const { from, to } = input;
    const fromValuesItem: ICalculatedTransactionValuesItem | undefined = from
        ? JSON.parse(from)
        : undefined;
    const toValuesItem: ICalculatedTransactionValuesItem | undefined = to
        ? JSON.parse(to)
        : undefined;

    if (!fromValuesItem && !toValuesItem) {
        return null;
    }

    return {
        from: fromValuesItem,
        to: toValuesItem,
    };
};
