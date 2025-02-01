import { IFailedResponse } from 'types/apiClient.types';

export const getFailedResponseMessage = (
    responseData: Record<string, unknown>,
): string => {
    const messageFromResponse = responseData.message;
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
    responseData: Record<string, unknown>,
): IFailedResponse['cause'] => {
    return String(responseData.statusCode || responseData.cause) || undefined;
};
