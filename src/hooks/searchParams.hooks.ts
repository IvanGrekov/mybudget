import { useCallback } from 'react';

import { useSearchParams } from 'next/navigation';

export const useGetSearchParams = (): URLSearchParams => {
    const routerSearchParams = useSearchParams();

    return new URLSearchParams(Array.from(routerSearchParams.entries()));
};

type TUseGetStringifiedSearchParams = () => (
    newKey?: string,
    newValue?: string,
) => string;

export const useGetStringifiedSearchParams: TUseGetStringifiedSearchParams =
    () => {
        const searchParams = useSearchParams();

        return useCallback(
            (newKey, newValue) => {
                const params = [];

                if (newKey && newValue) {
                    params.push(`${newKey}=${newValue}`);
                }

                for (const [key, value] of searchParams.entries()) {
                    if (key === newKey) {
                        continue;
                    }

                    if (value) {
                        params.push(`${key}=${value}`);
                    }
                }

                return params.length ? `?${params.join('&')}` : '';
            },
            [searchParams],
        );
    };
