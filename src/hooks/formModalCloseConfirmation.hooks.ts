import { useCallback, useEffect } from 'react';

import { useConfirmNavigationContext } from 'contexts/ConfirmNavigationContext';

export const useFormModalCloseConfirmation = (
    onClose: VoidFunction,
): VoidFunction => {
    const {
        shouldConfirmNavigation,
        setShouldShowCloseModalConfirmation,
        setOnConfirm,
    } = useConfirmNavigationContext();

    useEffect(() => {
        setOnConfirm(() => onClose);
    }, [onClose, setOnConfirm]);

    return useCallback((): void => {
        if (shouldConfirmNavigation) {
            setShouldShowCloseModalConfirmation(true);

            return;
        }

        onClose();
    }, [shouldConfirmNavigation, setShouldShowCloseModalConfirmation, onClose]);
};

export const useConfirmNavigation = (shouldConfirm: boolean): void => {
    const { setShouldConfirmNavigation } = useConfirmNavigationContext();

    useEffect(() => {
        setShouldConfirmNavigation(shouldConfirm);
    }, [shouldConfirm, setShouldConfirmNavigation]);
};
