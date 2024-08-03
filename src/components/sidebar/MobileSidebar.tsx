import Drawer from 'components/drawer/Drawer';
import { useMobileSidebar } from 'components/sidebar/hooks/useMobileSidebar';
import { TSidebarProps } from 'components/sidebar/types/sidebarProps';

export default function MobileSidebar({
    children,
    ...rest
}: TSidebarProps): JSX.Element {
    const { isOpen, onClose } = useMobileSidebar();

    return (
        <Drawer isOpen={isOpen} position="left" onClose={onClose} {...rest}>
            {children}
        </Drawer>
    );
}
