import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { BaseApiClient } from 'models/apiClient';

class ServerApiClient extends BaseApiClient {
    constructor() {
        super(() => {
            return cookies().get(SESSION_COOKIE_NAME)?.value || '';
        });
    }
}

export const SERVER_API_CLIENT = new ServerApiClient();
