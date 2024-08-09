import { PropsWithChildren, ReactNode } from 'react';

interface IAccountsLayoutProps extends PropsWithChildren {
    modal: ReactNode;
}

export default function AccountsLayout({
    children,
    modal,
}: IAccountsLayoutProps): JSX.Element {
    return (
        <>
            {children}
            {modal}
        </>
    );
}
