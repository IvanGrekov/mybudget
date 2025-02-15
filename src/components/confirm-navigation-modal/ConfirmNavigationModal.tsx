'use client';

import { useNavigationGuard } from 'next-navigation-guard';

import ConfirmationModal from 'components/confirmation-modal/ConfirmationModal';
import Typography from 'components/typography/Typography';
import { useConfirmNavigationContext } from 'contexts/ConfirmNavigationContext';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

export default function ConfirmNavigationModal(): JSX.Element {
    const {
        shouldShowCloseModalConfirmation,
        shouldConfirmNavigation,
        setShouldConfirmNavigation,
        setShouldShowCloseModalConfirmation,
        onConfirm,
        setOnConfirm,
    } = useConfirmNavigationContext();

    const { active, accept, reject } = useNavigationGuard({
        enabled: shouldConfirmNavigation,
    });

    const [text] = useGetFeatureTranslations({
        featureName: 'ConfirmationModal',
        keys: ['you_sure_want_leave'],
    });

    return (
        <ConfirmationModal
            isOpen={active || shouldShowCloseModalConfirmation}
            onClose={reject}
            onCancel={() => {
                reject();
                setShouldShowCloseModalConfirmation(false);
            }}
            onConfirm={() => {
                accept();
                onConfirm?.();
                setShouldConfirmNavigation(false);
                setShouldShowCloseModalConfirmation(false);
                setOnConfirm(null);
            }}
        >
            <Typography>{text}</Typography>
        </ConfirmationModal>
    );
}
