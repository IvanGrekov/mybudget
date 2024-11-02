'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from 'components/app-logo/AppLogo.module.scss';
import Typography from 'components/typography/Typography';
import { useIsMobile } from 'hooks/screenSize.hooks';
import { EAppRoutes } from 'types/appRoutes';

const LOGO_SIZE = 50;

export default function AppLogo(): JSX.Element {
    const isMobile = useIsMobile();

    return (
        <Link href={EAppRoutes.Root} className={styles['app-logo']}>
            <Image
                src="/mybudget.png"
                alt="App logo"
                width={LOGO_SIZE}
                height={LOGO_SIZE}
            />

            <Typography element="h1" variant={isMobile ? 'h5' : 'h6'}>
                MyBudget
            </Typography>
        </Link>
    );
}
