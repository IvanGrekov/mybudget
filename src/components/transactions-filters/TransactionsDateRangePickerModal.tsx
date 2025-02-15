import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { ITransactionsDateRangePickerModalData } from 'components/transactions-filters/types/transactionsDateRangePickerModalData';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

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
    const [title] = useGetFeatureTranslations({
        featureName: 'DateRangeFilter',
    });

    return (
        <Modal isOpen={isOpen} title={title} size="medium" onClose={onClose}>
            <Suspense fallback={<ModalCircularLoading />}>
                <TransactionsDateRangePickerModalContentLazy {...props} />
            </Suspense>
        </Modal>
    );
}
