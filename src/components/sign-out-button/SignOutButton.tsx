import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import Button from 'components/button/Button';
import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { EAppRoutes } from 'types/appRoutes';

export default function SignOutButton(): JSX.Element {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async (): Promise<void> => {
        setIsLoading(true);

        await setCookie({
            key: SESSION_COOKIE_NAME,
        });

        router.replace(EAppRoutes.Auth);
    };

    return <Button text="Sign out" onClick={onClick} isLoading={isLoading} />;
}
