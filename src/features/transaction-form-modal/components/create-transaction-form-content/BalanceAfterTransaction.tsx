import TextField from 'components/text-field/TextField';
import { useGetTransactionsFeatureTranslations } from 'hooks/translations.hooks';
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
    const label = useGetTransactionsFeatureTranslations()(
        'balance_after_transaction',
    );

    if (typeof value !== 'number' || !currency) {
        return null;
    }

    return (
        <TextField
            label={label}
            isFullWidth={true}
            disabled={true}
            value={`${roundValue(value)} ${currency}`}
        />
    );
}
