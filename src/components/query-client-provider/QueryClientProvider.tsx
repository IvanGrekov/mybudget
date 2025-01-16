import { PropsWithChildren } from 'react';

import { QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from 'utils/getQueryClient';

export default function QueryClientProvider({
    children,
}: PropsWithChildren): JSX.Element {
    return (
        <TanstackQueryClientProvider client={getQueryClient()}>
            {children}
        </TanstackQueryClientProvider>
    );
}
