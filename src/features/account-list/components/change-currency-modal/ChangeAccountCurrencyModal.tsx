import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { TChangeAccountCurrencyModalDataProps } from 'features/account-list/components/change-currency-modal/types/changeAccountCurrencyModalDataProps';

const ChangeAccountCurrencyModalContentLazy = lazy(
    () =>
        import(
            'features/account-list/components/change-currency-modal/ChangeAccountCurrencyModalContent'
        ),
);

export default function ChangeAccountCurrencyModal({
    isOpen,
    onClose,
    ...dataProps
}: IModalBaseProps & TChangeAccountCurrencyModalDataProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Change Account Currency"
            size="small"
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <ChangeAccountCurrencyModalContentLazy
                    {...dataProps}
                    onClose={onClose}
                />
            </Suspense>
        </Modal>
    );
}
