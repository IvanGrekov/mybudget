'use client';

import DrawerContent from 'components/drawer/DrawerContent';
import { IDrawerProps } from 'components/drawer/types/drawerProps';
import { useBodyScrollLock } from 'hooks/useBodyScrollLock';
import { useCreatePortal } from 'hooks/useCreatePortal';
import { useEscapeListener } from 'hooks/useEscapeListener';

export default function Drawer({
    onClose,
    isOpen,
    ...rest
}: IDrawerProps): JSX.Element | null {
    const createPortal = useCreatePortal({
        selector: '#drawer-root',
        content: <DrawerContent {...rest} isOpen={isOpen} onClose={onClose} />,
    });

    useBodyScrollLock(isOpen);
    useEscapeListener(onClose);

    return createPortal();
}
