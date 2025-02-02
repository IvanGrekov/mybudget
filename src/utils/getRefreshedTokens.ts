import { Maybe } from 'yup';

import { makeApiFetch } from 'utils/makeApiFetch';

export const getRefreshedTokens = (
    refreshToken: string,
    deviceId: Maybe<string>,
): Promise<Response> => {
    if (!refreshToken) {
        return Promise.reject(new Error('deviceId is required'));
    }

    return makeApiFetch({
        url: '/authentication/refresh-token',
        method: 'POST',
        body: {
            refreshToken,
            deviceId,
        },
    });
};
