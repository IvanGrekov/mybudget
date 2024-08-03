import cx from 'classnames';

import styles from 'components/sidebar/Sidebar.module.scss';
import { TSidebarProps } from 'components/sidebar/types/sidebarProps';

export default function DesktopSidebar({
    children,
    className,
}: TSidebarProps): JSX.Element {
    return <aside className={cx(styles.sidebar, className)}>{children}</aside>;
}
