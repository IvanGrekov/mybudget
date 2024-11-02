import { useState } from 'react';

import { signOut } from 'actions/signOut';
import Button from 'components/button/Button';

export default function SignOutButton(): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async (): Promise<void> => {
        setIsLoading(true);

        await signOut().finally(() => {
            setIsLoading(false);
        });
    };

    return <Button text="Sign out" onClick={onClick} isLoading={isLoading} />;
}
