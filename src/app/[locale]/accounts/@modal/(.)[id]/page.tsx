'use client';

import { useRouter } from 'next/navigation';

import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import AccountDetails from 'features/account-details/components/account-details/AccountDetails';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import { IWithIdParamProps } from 'types/pageProps';

export default function AccountDetailsModal({
    params,
}: IWithIdParamProps): JSX.Element {
    const router = useRouter();
    const title = usePageHeaderTitle('AccountDetailsPage');

    const { id } = params;

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
            <AccountDetails accountId={id} />
        </Modal>
    );
}
