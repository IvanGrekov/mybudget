import Chip from 'components/chip/Chip';
import styles from 'features/transaction-list/components/header-chips/HeaderChips.module.scss';
import { getColorForTypeChip } from 'features/transaction-list/components/header-chips/utils/getColorForTypeChip';
import { useGetMyTimeZone } from 'hooks/me.hooks';
import { Transaction } from 'types/generated.types';
import { getTime } from 'utils/date.utils';
import { getCapitalizedString } from 'utils/string.utils';

const CHIP_TITLE_VARIANT = 'body2';
const CHIP_SIZE = 'small';

export default function HeaderChips({
    createdAt,
    type,
}: Pick<Transaction, 'createdAt' | 'type'>): JSX.Element {
    const { timeZone } = useGetMyTimeZone();

    return (
        <header className={styles['header-chips']}>
            <Chip
                title={getTime(createdAt, timeZone)}
                size={CHIP_SIZE}
                titleVariant={CHIP_TITLE_VARIANT}
            />

            <Chip
                title={getCapitalizedString(type, '_')}
                size={CHIP_SIZE}
                titleVariant={CHIP_TITLE_VARIANT}
                color={getColorForTypeChip(type)}
            />
        </header>
    );
}
