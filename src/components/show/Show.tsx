import { PropsWithChildren } from 'react';

interface IShowProps extends PropsWithChildren {
    when: boolean;
}

export default function Show({
    when,
    children,
}: IShowProps): JSX.Element | null {
    if (!when) {
        return null;
    }

    return <>{children}</>;
}
