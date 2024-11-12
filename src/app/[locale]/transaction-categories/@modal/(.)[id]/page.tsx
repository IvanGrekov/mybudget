'use client';

import { lazy, Suspense } from 'react';

import { useRouter } from 'next/navigation';

import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import { IWithIdParamProps } from 'types/pageProps';

const TransactionCategoryDetailsLazy = lazy(
    () =>
        import(
            'features/transaction-category-details/components/transaction-category-details/TransactionCategoryDetails'
        ),
);

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
            <Suspense fallback={<ModalCircularLoading />}>
                <TransactionCategoryDetailsLazy transactionCategoryId={id} />
            </Suspense>
        </Modal>
    );
}
