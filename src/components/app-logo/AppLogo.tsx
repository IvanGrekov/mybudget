import Image from 'next/image';
import Link from 'next/link';

import styles from 'components/app-logo/AppLogo.module.scss';
import Typography from 'components/typography/Typography';
import { EAppRoutes } from 'types/appRoutes';

export default function AppLogo(): JSX.Element {
    return (
        <Link href={EAppRoutes.Root} className={styles['app-logo']}>
            <Image src="/mybudget.png" alt="App logo" width={50} height={50} />

            <Typography element="h1" variant="h5">
                MyBudget
            </Typography>
        </Link>
    );
}
