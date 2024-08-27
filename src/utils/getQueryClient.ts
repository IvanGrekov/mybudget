import {
    QueryClient,
    defaultShouldDehydrateQuery,
    isServer,
} from '@tanstack/react-query';

const makeQueryClient = (): QueryClient => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
            },
            dehydrate: {
                // include pending queries in dehydration
                shouldDehydrateQuery: (query): boolean =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
        },
    });
};

let BROWSER_QUERY_CLIENT: QueryClient | null = null;

export const getQueryClient = (): QueryClient => {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!BROWSER_QUERY_CLIENT) {
            BROWSER_QUERY_CLIENT = makeQueryClient();
        }

        return BROWSER_QUERY_CLIENT;
    }
};
