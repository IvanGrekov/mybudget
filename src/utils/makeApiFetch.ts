type TMakeApiFetch = (args: {
    url: string;
    method?: string;
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
            revalidate: method === 'GET' ? 60 * 60 : 0,
            ...requestOptions?.next,
        },
    });
};
