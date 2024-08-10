'use client';

import { useRouter } from 'next/navigation';

import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import AccountDetails from 'features/account-details/components/account-details/AccountDetails';
import { EAppTitles } from 'types/appTitles';
import { IPageWithIdParamProps } from 'types/pageProps';

export default function AccountDetailsModal({
    params,
}: IPageWithIdParamProps): JSX.Element {
    const router = useRouter();

    const { id } = params;

    const onClose = (): void => {
        router.back();
    };

    return (
        <Modal
            isOpen={true}
            title={EAppTitles.AccountDetails}
            size="large"
            actions={<Button text="Close" onClick={onClose} />}
            onClose={onClose}
        >
            <AccountDetails accountId={id} />
        </Modal>
    );
}
