'use client';

import { useRouter } from 'next/navigation';

import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import TransactionCategoryDetails from 'features/transaction-category-details/components/transaction-category-details/TransactionCategoryDetails';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import { IPageWithIdParamProps } from 'types/pageProps';

export default function TransactionCategoryDetailsModal({
    params,
}: IPageWithIdParamProps): JSX.Element {
    const router = useRouter();
    const title = usePageHeaderTitle('TransactionCategoryDetailsPage');

    const { id } = params;

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
            <TransactionCategoryDetails transactionCategoryId={id} />
        </Modal>
    );
}
