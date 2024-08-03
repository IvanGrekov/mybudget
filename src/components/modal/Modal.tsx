'use client';

import ModalContent from 'components/modal/ModalContent';
import { TModalProps } from 'components/modal/types/modalProps';
import { useBodyScrollLock } from 'hooks/useBodyScrollLock';
import { useCreatePortal } from 'hooks/useCreatePortal';
import { useEscapeListener } from 'hooks/useEscapeListener';

export default function Modal({
    onClose,
    isOpen,
    ...rest
}: TModalProps): JSX.Element | null {
    const createPortal = useCreatePortal({
        selector: '#modal-root',
        content: <ModalContent {...rest} isOpen={isOpen} onClose={onClose} />,
    });

    useBodyScrollLock(isOpen);
    useEscapeListener(onClose);

    return createPortal();
}
