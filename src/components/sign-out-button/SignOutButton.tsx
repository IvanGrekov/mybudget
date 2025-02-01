import { useState } from 'react';

import { signOut } from 'actions/signOut';
import Button from 'components/button/Button';
import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';

export default function SignOutButton(): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const addErrorMessage = useAddErrorMessageToNotifications();

    const onClick = async (): Promise<void> => {
        setIsLoading(true);

        await signOut()
            .then((data) => {
                if (data?.error) {
                    addErrorMessage(data.error);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return <Button text="Sign out" onClick={onClick} isLoading={isLoading} />;
}
