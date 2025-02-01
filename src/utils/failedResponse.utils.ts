import { IFailedResponse } from 'types/apiClient.types';
import log from 'utils/log';

export const getFailedResponseMessage = (
    responseData: string | Record<string, unknown>,
): string => {
    if (typeof responseData === 'string') {
        return responseData;
    }

    const messageFromResponse =
        responseData.message || responseData.error || responseData.statusText;
    let message: string | null = null;

    if (Array.isArray(messageFromResponse)) {
        message = messageFromResponse.join(', ');
    } else {
        message = String(messageFromResponse);
    }

    if (!message) {
        return 'An error occurred';
    }

    message = message.slice(0, 1).toUpperCase() + message.slice(1);

    return message;
};

export const getFailedResponseCause = (
    responseData: string | Record<string, unknown>,
): IFailedResponse['cause'] => {
    if (typeof responseData === 'string') {
        return undefined;
    }

    return (
        String(
            responseData.cause ||
                responseData.statusText ||
                responseData.statusCode,
        ) || undefined
    );
};

export const getFailedResponse = (
    responseData: string | Record<string, unknown>,
    logMessage?: string,
): IFailedResponse => {
    const result = {
        error: getFailedResponseMessage(responseData),
        cause: getFailedResponseCause(responseData),
    };

    if (logMessage) {
        log(logMessage, result);
    }

    return result;
};
