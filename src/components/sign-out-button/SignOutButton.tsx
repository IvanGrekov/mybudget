import { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import Button from 'components/button/Button';
import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { EAppRoutes } from 'types/appRoutes';
import { getIsAuthPage } from 'utils/getIsAuthPage';

export default function SignOutButton(): JSX.Element | null {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async (): Promise<void> => {
        setIsLoading(true);

        await setCookie({
            key: SESSION_COOKIE_NAME,
        });

        router.replace(EAppRoutes.Auth);
    };

    if (getIsAuthPage(pathname)) {
        return null;
    }

    return <Button text="Sign out" onClick={onClick} isLoading={isLoading} />;
}
