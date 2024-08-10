import { PropsWithChildren, ReactNode } from 'react';

interface ITransactionCategoriesLayoutProps extends PropsWithChildren {
    modal: ReactNode;
}

export default function TransactionCategoriesLayout({
    children,
    modal,
}: ITransactionCategoriesLayoutProps): JSX.Element {
    return (
        <>
            {children}
            {modal}
        </>
    );
}
