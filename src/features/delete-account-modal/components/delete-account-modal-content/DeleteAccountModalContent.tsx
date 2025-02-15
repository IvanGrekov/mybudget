import { useState } from 'react';

import Button from 'components/button/Button';
import Checkbox from 'components/checkbox/Checkbox';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import Typography from 'components/typography/Typography';
import { useArchiveAccount } from 'features/delete-account-modal/hooks/useArchiveAccount';
import { useDeleteAccount } from 'features/delete-account-modal/hooks/useDeleteAccount';
import { TDeleteAccountModalDataProps } from 'features/delete-account-modal/types/deleteAccountModalDataProps';
import {
    useGetFeatureTranslations,
    useGetActionButtonsTranslations,
} from 'hooks/translations.hooks';
import styles from 'styles/ModalContent.module.scss';

interface IDeleteAccountModalContentProps extends TDeleteAccountModalDataProps {
    onClose: VoidFunction;
}

export default function DeleteAccountModalContent({
    id,
    type,
    name,
    onClose,
    onCompleted,
}: IDeleteAccountModalContentProps): JSX.Element {
    const [isSoftDeleting, setIsSoftDeleting] = useState(false);
    const [isForceDeleting, setIsForceDeleting] = useState(false);

    const { isLoading: isDeleteLoading, remove } = useDeleteAccount({
        id,
        type,
        onCompleted,
    });
    const { isLoading: isArchiveLoading, archive } = useArchiveAccount({
        id,
        type,
        onCompleted,
    });

    const [
        youSureWantDeleteAccountText,
        iWantDeleteAccountText,
        deleteRelatedTransactionsText,
    ] = useGetFeatureTranslations({
        featureName: 'DeleteEntity',
        keys: [
            'you_sure_want_delete_account',
            'i_want_delete_account',
            'delete_related_transactions',
        ],
    });

    const submitText = useGetActionButtonsTranslations()('delete');

    return (
        <>
            <div className={styles.container}>
                <Typography>
                    {youSureWantDeleteAccountText} &quot;{name}
                    &quot; ?
                </Typography>

                <Checkbox
                    checked={isSoftDeleting}
                    label={iWantDeleteAccountText}
                    isFullWidth={true}
                    onChange={() => setIsSoftDeleting((prev) => !prev)}
                />

                <Checkbox
                    checked={isForceDeleting}
                    label={deleteRelatedTransactionsText}
                    isFullWidth={true}
                    onChange={() => setIsForceDeleting((prev) => !prev)}
                />
            </div>

            <ModalActions>
                <CancelAction onCancel={onClose} />
                <Button
                    text={submitText}
                    color="red"
                    type="submit"
                    isLoading={isDeleteLoading || isArchiveLoading}
                    isDisabled={!isSoftDeleting}
                    onClick={(): void => {
                        onClose();
                        (isForceDeleting ? remove : archive)();
                    }}
                />
            </ModalActions>
        </>
    );
}
