'use client';

import { lazy, Suspense } from 'react';

import { useRouter } from 'next/navigation';

import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import { IWithIdParamProps } from 'types/pageProps';

const AccountDetailsLazy = lazy(
    () =>
        import(
            'features/account-details/components/account-details/AccountDetails'
        ),
);

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
            <Suspense fallback={<ModalCircularLoading />}>
                <AccountDetailsLazy accountId={id} />
            </Suspense>
        </Modal>
    );
}
