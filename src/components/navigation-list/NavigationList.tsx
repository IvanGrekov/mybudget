'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import Link from 'components/link/Link';
import styles from 'components/navigation-list/NavigationList.module.scss';
import { NAVIGATION_LIST } from 'components/navigation-list/constants/navigationList';
import { getIsNavItemActive } from 'components/navigation-list/utils/getIsNavItemActive';
import { useMobileSidebarContext } from 'contexts/MobileSidebarContext';
import { useIsMobile } from 'hooks/screenSize.hooks';

export default function NavigationList(): JSX.Element {
    const locale = useLocale();
    const t = useTranslations('NavigationLinkTitles');

    const pathName = usePathname();
    const { setIsOpen } = useMobileSidebarContext();

    const isMobile = useIsMobile();

    const onClick = (): void => {
        setIsOpen(false);
    };

    return (
        <ul className={styles.list}>
            {NAVIGATION_LIST.map(({ id, href }) => (
                <li key={id}>
                    <Link
                        href={href}
                        text={t(href)}
                        isActive={getIsNavItemActive({
                            pathName,
                            locale,
                            itemHref: href,
                        })}
                        tabIndex={1}
                        textVariant={isMobile ? 'h6' : 'subtitle2'}
                        onClick={onClick}
                    />
                </li>
            ))}
        </ul>
    );
}
