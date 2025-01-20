import { useCallback } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

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

export const useGetSearchParamsValue = (key: string): string | null => {
    const searchParams = useSearchParams();

    return searchParams.get(key);
};

type TSetSearchParamsValue = (key: string, value: string) => void;

export const useGetSetSearchParamsValue = (): TSetSearchParamsValue => {
    const router = useRouter();
    const pathname = usePathname();
    const getStringifiedSearchParams = useGetStringifiedSearchParams();

    return (key, value) => {
        const params = getStringifiedSearchParams(key, value);
        router.push(`${pathname}${params}`);
    };
};
