import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { IFailedResponse } from 'types/apiClient.types';
import log from 'utils/log';

export const getFailedResponseMessage = (
    responseData: string | Record<string, unknown>,
): string => {
    if (typeof responseData === 'string') {
        return responseData;
    }

    const messageFromResponse = responseData.message || responseData.error;

    if (!messageFromResponse) {
        return DEFAULT_ERROR_MESSAGE;
    }

    let message: string | null = null;

    if (Array.isArray(messageFromResponse)) {
        message = messageFromResponse.join(', ');
    } else {
        message = String(messageFromResponse);
    }

    if (!message) {
        return DEFAULT_ERROR_MESSAGE;
    }

    message = message.slice(0, 1).toUpperCase() + message.slice(1);

    return message;
};

export const getFailedResponseCause = (
    responseData: string | Record<string, unknown>,
    message: string,
): IFailedResponse['cause'] => {
    if (typeof responseData === 'string') {
        return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const { cause, statusCode, statusText, status } = responseData || {};

    let result: unknown;

    for (const item of [cause, statusCode, statusText, status]) {
        if (item && item !== message) {
            result = item;
            break;
        }
    }

    if (typeof result === 'string' || typeof result === 'number') {
        return result;
    }

    return undefined;
};

export const getFailedResponse = (
    responseData: string | Record<string, unknown>,
    logMessage?: string,
): IFailedResponse => {
    const error = getFailedResponseMessage(responseData);

    const result = {
        error,
        cause: getFailedResponseCause(responseData, error),
    };

    if (logMessage) {
        log(logMessage, result);
    }

    return result;
};
