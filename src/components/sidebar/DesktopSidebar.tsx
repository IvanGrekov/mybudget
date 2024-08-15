import cx from 'classnames';

import styles from 'components/sidebar/Sidebar.module.scss';
import { TSidebarProps } from 'components/sidebar/types/sidebarProps';

type TDesktopSidebarProps = Pick<TSidebarProps, 'children' | 'className'>;

export default function DesktopSidebar({
    children,
    className,
}: TDesktopSidebarProps): JSX.Element {
    return <aside className={cx(styles.sidebar, className)}>{children}</aside>;
}
