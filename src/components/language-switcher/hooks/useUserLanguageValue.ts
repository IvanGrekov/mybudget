import {
    useParams,
    usePathname,
    useSearchParams,
    useRouter,
} from 'next/navigation';

import { PRIMARY_LOCALE, SECONDARY_LOCALE } from 'constants/locales';
import { IWithLocaleParamProps } from 'types/pageProps';

interface IUseUserLanguageValueResult {
    value: string;
    toggleValue: VoidFunction;
}

export const useUserLanguageValue = (): IUseUserLanguageValueResult => {
    const { locale } = useParams<IWithLocaleParamProps['params']>();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const toggleValue = (): void => {
        const newLocale =
            locale === PRIMARY_LOCALE ? SECONDARY_LOCALE : PRIMARY_LOCALE;
        const newPathname = pathname.replace(locale, newLocale);
        const search = searchParams.toString();
        const pathnameWithSearch = search
            ? `${newPathname}?${search}`
            : newPathname;

        router.replace(pathnameWithSearch);
    };

    return {
        value: locale,
        toggleValue,
    };
};
