import { lazy, Suspense } from 'react';

import { useQuery } from '@tanstack/react-query';

import EmptyState from 'components/empty-state/EmptyState';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import Show from 'components/show/Show';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { EFetchingTags } from 'types/fetchingTags';
import { AccountTypeEnum } from 'types/generated.types';

const CreateAccountModalContentLazy = lazy(
    () =>
        import(
            'features/account-form-modal/components/create-account-modal/CreateAccountModalContent'
        ),
);

interface ICreateAccountModalProps extends IModalBaseProps {
    defaultAccountType: AccountTypeEnum;
}

export default function CreateAccountModal({
    defaultAccountType,
    isOpen,
    onClose,
}: ICreateAccountModalProps): JSX.Element {
    const { isPending, data: user } = useQuery({
        queryKey: [EFetchingTags.ME],
        queryFn: () => CLIENT_MY_BUDGET_API.getMe(),
    });

    const onCloseModal = useFormModalCloseConfirmation(onClose);

    return (
        <Modal
            isOpen={isOpen}
            title="Create Account"
            size="medium"
            onClose={onCloseModal}
        >
            <Show when={isPending}>
                <ModalCircularLoading />
            </Show>

            <Show when={!user && !isPending}>
                <EmptyState text="We couldn't find your profile" />
            </Show>

            {user && (
                <Suspense fallback={<ModalCircularLoading />}>
                    <CreateAccountModalContentLazy
                        user={user}
                        defaultAccountType={defaultAccountType}
                        hideModal={onClose}
                        onCloseModal={onCloseModal}
                    />
                </Suspense>
            )}
        </Modal>
    );
}
