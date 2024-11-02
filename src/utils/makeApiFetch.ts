type TMakeApiFetch = (args: {
    url: string;
    method?: 'POST' | 'GET' | 'PATCH' | 'DELETE';
    body?: unknown;
    headers?: HeadersInit;
    requestOptions?: RequestInit;
    apiUrl?: string;
}) => Promise<Response>;

export const makeApiFetch: TMakeApiFetch = ({
    url,
    body,
    method = 'GET',
    headers,
    requestOptions,
    apiUrl = process.env.NEXT_PUBLIC_API_URL,
}) => {
    return fetch(`${apiUrl}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...requestOptions,
        next: {
            revalidate: 60 * 60,
            ...requestOptions?.next,
        },
    });
};
