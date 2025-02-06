import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { ITransactionsDateRangePickerModalData } from 'components/transactions-filters/types/transactionsDateRangePickerModalData';

const TransactionsDateRangePickerModalContentLazy = lazy(
    () =>
        import(
            'components/transactions-filters/TransactionsDateRangePickerModalContent'
        ),
);

export default function TransactionsDateRangePickerModal({
    isOpen,
    onClose,
    ...props
}: IModalBaseProps & ITransactionsDateRangePickerModalData): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Select Date Range"
            size="medium"
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <TransactionsDateRangePickerModalContentLazy {...props} />
            </Suspense>
        </Modal>
    );
}
