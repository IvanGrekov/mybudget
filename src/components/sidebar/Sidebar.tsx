'use client';

import DesktopSidebar from 'components/sidebar/DesktopSidebar';
import MobileSidebar from 'components/sidebar/MobileSidebar';
import { TSidebarProps } from 'components/sidebar/types/sidebarProps';
import ThemeSwitcher from 'components/theme-switcher/ThemeSwitcher';
import { useIsMobileSidebar } from 'hooks/useIsMobileSidebar';

export default function Sidebar(props: TSidebarProps): JSX.Element {
    const isMobileSidebar = useIsMobileSidebar();

    return isMobileSidebar ? (
        <MobileSidebar {...props} header={<ThemeSwitcher />} />
    ) : (
        <DesktopSidebar {...props} />
    );
}
