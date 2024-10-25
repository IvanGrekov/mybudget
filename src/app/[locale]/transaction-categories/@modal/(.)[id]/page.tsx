'use client';

import { useRouter } from 'next/navigation';

import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import TransactionCategoryDetails from 'features/transaction-category-details/components/transaction-category-details/TransactionCategoryDetails';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import { IWithIdParamProps } from 'types/pageProps';

export default function TransactionCategoryDetailsModal({
    params: { id },
}: IWithIdParamProps): JSX.Element {
    const router = useRouter();
    const title = usePageHeaderTitle('TransactionCategoryDetailsPage');

    const onClose = (): void => {
        router.back();
    };

    return (
        <Modal
            isOpen={true}
            title={title}
            actions={<Button text="Close" onClick={onClose} />}
            onClose={onClose}
        >
            <UnderDevelopmentMessage />
            <TransactionCategoryDetails transactionCategoryId={id} />
        </Modal>
    );
}
