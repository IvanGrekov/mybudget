import Typography from 'components/typography/Typography';
import styles from 'features/overall-balance/components/balance-details/BalanceDetails.module.scss';
import { TBalanceItems } from 'features/overall-balance/components/balance-details/types/balanceItems';
import { getBalancesByCurrency } from 'features/overall-balance/components/balance-details/types/getBalancesByCurrency';
import { roundValue } from 'utils/roundValue';
import { getCapitalizedString } from 'utils/string.utils';

interface ISampleComponentProps {
    title: string;
    items: TBalanceItems;
}

export default function BalanceItems({
    title,
    items,
}: ISampleComponentProps): JSX.Element {
    const balances = getBalancesByCurrency(items);

    return (
        <>
            <Typography variant="subtitle1">
                {getCapitalizedString(title, '_')}:
            </Typography>

            <ul className={styles['balances-list']}>
                {Object.entries(balances).map(([currency, balance]) => (
                    <li key={currency}>
                        <Typography>
                            {roundValue(balance)} {currency}
                        </Typography>
                    </li>
                ))}
            </ul>
        </>
    );
}
