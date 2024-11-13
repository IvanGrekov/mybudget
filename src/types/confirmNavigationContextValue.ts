import { Dispatch, SetStateAction } from 'react';

export interface IConfirmNavigationContext {
    shouldConfirmNavigation: boolean;
    shouldShowCloseModalConfirmation: boolean;
    setShouldConfirmNavigation: Dispatch<SetStateAction<boolean>>;
    setShouldShowCloseModalConfirmation: Dispatch<SetStateAction<boolean>>;
    onConfirm: VoidFunction | null;
    setOnConfirm: Dispatch<SetStateAction<VoidFunction | null>>;
}
