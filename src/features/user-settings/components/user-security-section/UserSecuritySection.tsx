'use client';

import Button from 'components/button/Button';
import TfaSettingsModal from 'features/user-settings/components/tfa-settings-modal/TfaSettingsModal';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import { useModal } from 'hooks/useModal';

interface IUserSecuritySectionProps {
    isTfaEnabled: boolean;
}

export default function UserSecuritySection({
    isTfaEnabled,
}: IUserSecuritySectionProps): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    const [enableText, disableText] = useGetFeatureTranslations({
        featureName: 'SettingsPage',
        keys: [
            'enable_two_factor_authentication',
            'disable_two_factor_authentication',
        ],
    });

    const text = isTfaEnabled ? disableText : enableText;

    return (
        <>
            <Button variant="contained" text={text} onClick={openModal} />

            <TfaSettingsModal
                isTfaEnabled={isTfaEnabled}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
}
