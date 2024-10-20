type TMakeApiFetch = (args: {
    url: string;
    method?: 'POST' | 'GET' | 'PATCH' | 'DELETE';
    body?: unknown;
    headers?: HeadersInit;
    requestOptions?: RequestInit;
}) => Promise<Response>;

export const makeApiFetch: TMakeApiFetch = ({
    url,
    body,
    method = 'GET',
    headers,
    requestOptions,
}) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...requestOptions,
    });
};
