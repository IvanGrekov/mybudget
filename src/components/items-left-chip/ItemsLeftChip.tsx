'use client';

import HeaderChip from 'components/header-chip/HeaderChip';
import InfoIcon from 'components/icons/InfoIcon';
import Tooltip from 'components/tooltip/Tooltip';
import { getCapitalizedString } from 'utils/string.utils';

interface IItemsLeftChipProps {
    itemName: string;
    currentItemsLength: number;
    maxItemsLength: number;
}

export default function ItemsLeftChip({
    itemName,
    currentItemsLength,
    maxItemsLength,
}: IItemsLeftChipProps): JSX.Element {
    const endWithY = itemName.endsWith('y');
    const itemsName = `${getCapitalizedString(
        endWithY ? itemName.slice(0, -1) : itemName,
    )}${itemName.endsWith('y') ? 'ies' : 's'}`;

    return (
        <Tooltip
            position="bottom"
            text={`You can create up to ${maxItemsLength} ${itemsName}. ${currentItemsLength} already created.`}
        >
            <HeaderChip
                title={`${itemsName} (${currentItemsLength}/${maxItemsLength})`}
            >
                <InfoIcon size="extraSmall" />
            </HeaderChip>
        </Tooltip>
    );
}
