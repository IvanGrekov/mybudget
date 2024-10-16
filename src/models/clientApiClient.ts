import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { BaseApiClient } from 'models/apiClient';
import { getCookie } from 'utils/getCookie';

class ClientApiClient extends BaseApiClient {
    constructor() {
        super(() => {
            return getCookie(SESSION_COOKIE_NAME) || '';
        });
    }
}

export const CLIENT_API_CLIENT = new ClientApiClient();
