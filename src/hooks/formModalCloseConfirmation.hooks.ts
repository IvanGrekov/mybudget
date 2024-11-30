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
        } else {
            onClose();
        }
    }, [shouldConfirmNavigation, setShouldShowCloseModalConfirmation, onClose]);
};

export const useConfirmNavigation = (
    shouldConfirm: boolean | Record<string, unknown>,
): VoidFunction => {
    const { setShouldConfirmNavigation } = useConfirmNavigationContext();

    useEffect(() => {
        const value =
            typeof shouldConfirm === 'boolean'
                ? shouldConfirm
                : Object.keys(shouldConfirm).length > 0;

        setShouldConfirmNavigation(value);
    }, [shouldConfirm, setShouldConfirmNavigation]);

    return (): void => {
        setShouldConfirmNavigation(false);
    };
};
