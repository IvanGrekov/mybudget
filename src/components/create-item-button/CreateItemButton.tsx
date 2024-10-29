'use client';

import IconButton from 'components/button/IconButton';
import AddIcon from 'components/icons/AddIcon';
import { useIsScreenSize } from 'hooks/useIsScreenSize';
import { EScreenSizeNames } from 'types/screenSizeNames';

interface ICreateItemButtonProps {
    isDisabled?: boolean;
}

export default function CreateItemButton({
    isDisabled,
}: ICreateItemButtonProps): JSX.Element {
    const isMobile = useIsScreenSize(EScreenSizeNames.XS);

    return (
        <IconButton
            Icon={AddIcon}
            isDisabled={isDisabled}
            title="Create new item"
            iconSize={isMobile ? 'medium' : 'large'}
        />
    );
}
