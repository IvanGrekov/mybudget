'use client';

import IconButton from 'components/button/IconButton';
import AddIcon from 'components/icons/AddIcon';
import { useIsScreenSize } from 'hooks/screenSize.hooks';
import { EScreenSizeNames } from 'types/screenSizeNames';

interface ICreateItemButtonProps {
    isDisabled?: boolean;
    onClick?: VoidFunction;
}

export default function CreateItemButton({
    isDisabled,
    onClick,
}: ICreateItemButtonProps): JSX.Element {
    const isMobile = useIsScreenSize(EScreenSizeNames.XS);

    return (
        <IconButton
            Icon={AddIcon}
            isDisabled={isDisabled}
            title="Create new item"
            iconSize={isMobile ? 'medium' : 'large'}
            onClick={onClick}
        />
    );
}
