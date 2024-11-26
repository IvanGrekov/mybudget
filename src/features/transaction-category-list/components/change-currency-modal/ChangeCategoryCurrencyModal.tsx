import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { TChangeCategoryCurrencyModalDataProps } from 'features/transaction-category-list/components/change-currency-modal/types/changeCategoryCurrencyModalDataProps';

const ChangeCategoryCurrencyModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-category-list/components/change-currency-modal/ChangeCategoryCurrencyModalContent'
        ),
);

export default function ChangeCategoryCurrencyModal({
    isOpen,
    onClose,
    ...dataProps
}: IModalBaseProps & TChangeCategoryCurrencyModalDataProps): JSX.Element {
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
