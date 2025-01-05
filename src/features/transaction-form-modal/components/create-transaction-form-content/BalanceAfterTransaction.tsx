import TextField from 'components/text-field/TextField';
import { Maybe } from 'types/utility.types';
import { roundValue } from 'utils/roundValue';

interface IBalanceAfterTransaction {
    value?: Maybe<number>;
    currency?: Maybe<string>;
}

export default function BalanceAfterTransaction({
    value,
    currency,
}: IBalanceAfterTransaction): JSX.Element | null {
    if (typeof value !== 'number' || !currency) {
        return null;
    }

    return (
        <TextField
            label="Balance after transaction"
            isFullWidth={true}
            disabled={true}
            value={`${roundValue(value)} ${currency}`}
        />
    );
}
