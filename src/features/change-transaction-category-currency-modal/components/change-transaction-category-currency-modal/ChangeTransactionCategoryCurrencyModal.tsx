import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { TChangeTransactionCategoryCurrencyModalDataProps } from 'features/change-transaction-category-currency-modal/types/changeTransactionCategoryCurrencyModalDataProps';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import { getCapitalizedString } from 'utils/string.utils';

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
    const [title] = useGetFeatureTranslations({
        featureName: 'ChangeEntityCurrency',
        keys: ['change_category_currency'],
    });

    return (
        <Modal
            isOpen={isOpen}
            title={getCapitalizedString(title)}
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
