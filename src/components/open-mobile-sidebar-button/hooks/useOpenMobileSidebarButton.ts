import { useMobileSidebarContext } from 'contexts/MobileSidebarContext';
import { useIsMobileSidebar } from 'hooks/useIsMobileSidebar';

type TUseOpenMobileSidebarButton = () => {
    isVisible: boolean | null;
    onClick: VoidFunction;
};

export const useOpenMobileSidebarButton: TUseOpenMobileSidebarButton = () => {
    const isVisible = useIsMobileSidebar();
    const { setIsOpen } = useMobileSidebarContext();

    const onClick = (): void => {
        setIsOpen(true);
    };

    return {
        isVisible,
        onClick,
    };
};
