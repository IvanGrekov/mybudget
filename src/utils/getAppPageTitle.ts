import { EAppTitles } from 'types/appTitles';

export const getAppPageTitle = (title?: string): string => {
    return `${EAppTitles.Root}${title ? ` - ${title}` : ''}`;
};
