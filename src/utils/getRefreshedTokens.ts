import { makeApiFetch } from 'utils/makeApiFetch';

export const getRefreshedTokens = (refreshToken: string): Promise<Response> => {
    return makeApiFetch({
        url: '/authentication/refresh-token',
        method: 'POST',
        body: {
            refreshToken,
        },
    });
};
