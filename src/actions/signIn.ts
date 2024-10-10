'use server';

import { ApiClient } from 'models/apiClient';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { SignInDto } from 'types/generated.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';

type TSignInResponse = null | { shouldPassTfa?: boolean; error?: string };

export async function signIn(
    signInDto: SignInDto,
): TAsyncApiClientResult<TSignInResponse> {
    const result = await fetch(`${ApiClient.baseUrl}/authentication/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInDto),
    });
    const data = await result.json();
    const isOkStatus = result.ok;

    if (isOkStatus) {
        console.log('signIn success', data);

        return null;
    }

    const isUnauthorized = result.statusText.toLowerCase() === 'unauthorized';
    const isTfaRequired = data?.['cause'].toLowerCase().includes('two-factor');

    if (isUnauthorized && isTfaRequired && !signInDto.tfaToken) {
        return { shouldPassTfa: true };
    }

    return { error: getFailedResponseMessage(data) };
}
