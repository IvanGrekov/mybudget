'use client';

import { useRouter } from 'next/navigation';

import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import AccountDetails from 'features/account-details/components/account-details/AccountDetails';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import { IWithIdParamProps } from 'types/pageProps';

export default function AccountDetailsModal({
    params: { id },
}: IWithIdParamProps): JSX.Element {
    const router = useRouter();
    const title = usePageHeaderTitle('AccountDetailsPage');

    const onClose = (): void => {
        router.back();
    };

    return (
        <Modal
            isOpen={true}
            title={title}
            size="large"
            actions={<Button text="Close" onClick={onClose} />}
            onClose={onClose}
        >
            <UnderDevelopmentMessage />
            <AccountDetails accountId={id} />
        </Modal>
    );
}
