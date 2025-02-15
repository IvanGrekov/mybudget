import { IChipProps } from 'components/chip/types/chipProps';
import EntityChipList from 'components/entity-chip-list/EntityChipList';
import { getColorForTypeChip } from 'components/transaction-card-header-chips/utils/getColorForTypeChip';
import { useGetMyTimeZone } from 'hooks/me.hooks';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
import { Transaction } from 'types/generated.types';
import { getTime } from 'utils/date.utils';
import { getCapitalizedEnumValue } from 'utils/string.utils';

export default function TransactionCardHeaderChips({
    createdAt,
    type,
}: Pick<Transaction, 'createdAt' | 'type'>): JSX.Element {
    const entityNameTranslations = useGetEntityNameTranslations();
    const { timeZone } = useGetMyTimeZone();

    const chips: IChipProps[] = [
        {
            title: getTime(createdAt, timeZone),
        },
        {
            title: getCapitalizedEnumValue(type, entityNameTranslations),
            color: getColorForTypeChip(type),
        },
    ];

    return <EntityChipList items={chips} />;
}
