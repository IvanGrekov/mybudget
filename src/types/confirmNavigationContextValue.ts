import { Dispatch, SetStateAction } from 'react';

export interface IConfirmNavigationContext {
    shouldConfirmNavigation: boolean;
    setShouldConfirmNavigation: Dispatch<SetStateAction<boolean>>;
}
