import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { TChangeTransactionCategoryCurrencyModalDataProps } from 'features/change-transaction-category-currency-modal/types/changeTransactionCategoryCurrencyModalDataProps';

const ChangeCategoryCurrencyModalContentLazy = lazy(
    () =>
        import(
            'features/change-transaction-category-currency-modal/components/change-transaction-category-currency-modal-content/ChangeTransactionCategoryCurrencyModalContent'
        ),
);

export default function ChangeTransactionCategoryCurrencyModal({
    isOpen,
    onClose,
    ...dataProps
}: IModalBaseProps &
    TChangeTransactionCategoryCurrencyModalDataProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Change Category Currency"
            size="small"
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <ChangeCategoryCurrencyModalContentLazy
                    {...dataProps}
                    onClose={onClose}
                />
            </Suspense>
        </Modal>
    );
}
