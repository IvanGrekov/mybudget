'use client';

import Chip from 'components/chip/Chip';
import InfoIcon from 'components/icons/InfoIcon';
import Tooltip from 'components/tooltip/Tooltip';
import { useIsScreenSize } from 'hooks/useIsScreenSize';
import { EScreenSizeNames } from 'types/screenSizeNames';
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
    const isMobile = useIsScreenSize(EScreenSizeNames.XS);
    const endWithY = itemName.endsWith('y');
    const itemsName = `${getCapitalizedString(
        endWithY ? itemName.slice(0, -1) : itemName,
    )}${itemName.endsWith('y') ? 'ies' : 's'}`;

    return (
        <Tooltip
            position="bottom"
            text={`You can create up to ${maxItemsLength} ${itemsName}. ${currentItemsLength} already created.`}
        >
            <Chip
                title={`${itemsName} (${currentItemsLength}/${maxItemsLength})`}
                variant="outlined"
                size="big"
                titleVariant={isMobile ? 'subtitle2' : 'subtitle1'}
            >
                <InfoIcon size="extraSmall" />
            </Chip>
        </Tooltip>
    );
}
