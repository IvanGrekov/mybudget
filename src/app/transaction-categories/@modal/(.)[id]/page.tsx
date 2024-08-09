'use client';

import { useRouter } from 'next/navigation';

import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import TransactionCategoryDetails from 'features/transaction-category-details/components/transaction-category-details/TransactionCategoryDetails';
import { EAppTitles } from 'types/appTitles';
import { IPageWithIdParamProps } from 'types/pageWithIdParamProps';

export default function TransactionCategoryDetailsModal({
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
            title={EAppTitles.TransactionCategoryDetails}
            actions={<Button text="Close" onClick={onClose} />}
            onClose={onClose}
        >
            <TransactionCategoryDetails transactionCategoryId={id} />
        </Modal>
    );
}
