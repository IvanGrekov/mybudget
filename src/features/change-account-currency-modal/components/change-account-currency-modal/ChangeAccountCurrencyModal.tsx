import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { TChangeAccountCurrencyModalDataProps } from 'features/change-account-currency-modal/types/changeAccountCurrencyModalDataProps';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import { getCapitalizedString } from 'utils/string.utils';

const ChangeAccountCurrencyModalContentLazy = lazy(
    () =>
        import(
            'features/change-account-currency-modal/components/change-account-currency-modal-content/ChangeAccountCurrencyModalContent'
        ),
);

export default function ChangeAccountCurrencyModal({
    isOpen,
    onClose,
    ...dataProps
}: IModalBaseProps & TChangeAccountCurrencyModalDataProps): JSX.Element {
    const [title] = useGetFeatureTranslations({
        featureName: 'ChangeEntityCurrency',
        keys: ['change_account_currency'],
    });

    return (
        <Modal
            isOpen={isOpen}
            title={getCapitalizedString(title)}
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
