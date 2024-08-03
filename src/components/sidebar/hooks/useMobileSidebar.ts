import { useMobileSidebarContext } from 'contexts/MobileSidebarContext';

type TUseMobileSidebar = () => {
    isOpen: boolean;
    onClose: VoidFunction;
};

export const useMobileSidebar: TUseMobileSidebar = () => {
    const { isOpen, setIsOpen } = useMobileSidebarContext();

    const onClose = (): void => {
        setIsOpen(false);
    };

    return {
        isOpen,
        onClose,
    };
};
