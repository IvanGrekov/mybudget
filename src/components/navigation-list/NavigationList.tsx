'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import Link from 'components/link/Link';
import styles from 'components/navigation-list/NavigationList.module.scss';
import { NAVIGATION_LIST } from 'components/navigation-list/constants/navigationList';
import { getIsNavItemActive } from 'components/navigation-list/utils/getIsNavItemActive';
import { useMobileSidebarContext } from 'contexts/MobileSidebarContext';

export default function NavigationList(): JSX.Element {
    const locale = useLocale();
    const pathName = usePathname();
    const { setIsOpen } = useMobileSidebarContext();

    const onClick = (): void => {
        setIsOpen(false);
    };

    return (
        <ul className={styles.list}>
            {NAVIGATION_LIST.map(({ href, text }) => (
                <li key={href}>
                    <Link
                        href={href}
                        text={text}
                        isActive={getIsNavItemActive({
                            pathName,
                            locale,
                            itemHref: href,
                        })}
                        onClick={onClick}
                    />
                </li>
            ))}
        </ul>
    );
}
