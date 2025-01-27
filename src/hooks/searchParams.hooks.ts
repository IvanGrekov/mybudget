import { useCallback } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export const useGetSearchParams = (): URLSearchParams => {
    const routerSearchParams = useSearchParams();

    return new URLSearchParams(Array.from(routerSearchParams.entries()));
};

type TUseGetStringifiedSearchParams = () => (
    record: Record<string, string>,
) => string;

const useGetStringifiedSearchParams: TUseGetStringifiedSearchParams = () => {
    const searchParams = useSearchParams();

    return useCallback(
        (record) => {
            const params = [];

            for (const [key, value] of Object.entries(record)) {
                if (value) {
                    params.push(`${key}=${value}`);
                }
            }

            const recordKeys = Object.keys(record);

            for (const [key, value] of searchParams.entries()) {
                if (recordKeys.includes(key)) {
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

type TSetSearchParamsValue = (record: Record<string, string>) => void;

export const useGetSetSearchParamsValue = (): TSetSearchParamsValue => {
    const router = useRouter();
    const pathname = usePathname();
    const getStringifiedSearchParams = useGetStringifiedSearchParams();

    return (record) => {
        const params = getStringifiedSearchParams(record);
        router.push(`${pathname}${params}`);
    };
};
