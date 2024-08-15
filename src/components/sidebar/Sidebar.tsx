'use client';

import DesktopSidebar from 'components/sidebar/DesktopSidebar';
import MobileSidebar from 'components/sidebar/MobileSidebar';
import { TSidebarProps } from 'components/sidebar/types/sidebarProps';
import { useIsMobileSidebar } from 'hooks/useIsMobileSidebar';

export default function Sidebar(props: TSidebarProps): JSX.Element | null {
    const isMobileSidebar = useIsMobileSidebar();

    if (typeof isMobileSidebar !== 'boolean') {
        return null;
    }

    return isMobileSidebar ? (
        <MobileSidebar {...props} />
    ) : (
        <DesktopSidebar {...props} />
    );
}
