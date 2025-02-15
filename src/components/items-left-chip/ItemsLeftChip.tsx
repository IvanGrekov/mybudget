'use client';

import HeaderChip from 'components/header-chip/HeaderChip';
import InfoIcon from 'components/icons/InfoIcon';
import Tooltip from 'components/tooltip/Tooltip';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

interface IItemsLeftChipProps {
    itemsName: string;
    currentItemsLength: number;
    maxItemsLength: number;
}

export default function ItemsLeftChip({
    itemsName,
    currentItemsLength,
    maxItemsLength,
}: IItemsLeftChipProps): JSX.Element {
    const [itemsNameText, ofItemsNameText] = useGetFeatureTranslations({
        featureName: 'EntityNames',
        keys: [itemsName, `of_${itemsName}`],
    });
    const [youCanCreateText, alreadyCreatedText] = useGetFeatureTranslations({
        featureName: 'ItemsLeftChip',
        keys: ['you_can_create', 'already_created'],
    });

    return (
        <Tooltip
            position="bottom"
            text={`${youCanCreateText} ${maxItemsLength} ${ofItemsNameText}. ${currentItemsLength} ${alreadyCreatedText}.`}
        >
            <HeaderChip
                title={`${itemsNameText} (${currentItemsLength}/${maxItemsLength})`}
            >
                <InfoIcon size="extraSmall" />
            </HeaderChip>
        </Tooltip>
    );
}
