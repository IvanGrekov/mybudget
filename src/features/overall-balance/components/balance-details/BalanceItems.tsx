import Chip from 'components/chip/Chip';
import Typography from 'components/typography/Typography';
import styles from 'features/overall-balance/components/balance-details/BalanceDetails.module.scss';
import { TBalanceItems } from 'features/overall-balance/components/balance-details/types/balanceItems';
import { getBalancesByCurrency } from 'features/overall-balance/components/balance-details/types/getBalancesByCurrency';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
import { getColorForAccountTypeChip } from 'utils/getColorForAccountTypeChip';
import { roundValue } from 'utils/roundValue';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface ISampleComponentProps {
    title: string;
    items: TBalanceItems;
}

export default function BalanceItems({
    title,
    items,
}: ISampleComponentProps): JSX.Element {
    const entityNameTranslations = useGetEntityNameTranslations();

    const balances = getBalancesByCurrency(items);

    return (
        <>
            <Chip
                title={getCapitalizedEnumValue(title, entityNameTranslations)}
                color={getColorForAccountTypeChip(title)}
                size="small"
            />

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
