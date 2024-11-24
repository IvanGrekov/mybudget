import { useState } from 'react';

import Button from 'components/button/Button';
import Checkbox from 'components/checkbox/Checkbox';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import Typography from 'components/typography/Typography';
import { useArchiveAccount } from 'features/account-list/components/delete-account-modal/hooks/useArchiveAccount';
import { useDeleteAccount } from 'features/account-list/components/delete-account-modal/hooks/useDeleteAccount';
import { TDeleteAccountModalDataProps } from 'features/account-list/components/delete-account-modal/types/deleteAccountModalDataProps';
import styles from 'styles/ModalContent.module.scss';

interface IDeleteAccountModalContentProps extends TDeleteAccountModalDataProps {
    onClose: VoidFunction;
}

export default function DeleteAccountModalContent({
    id,
    type,
    name,
    onClose,
}: IDeleteAccountModalContentProps): JSX.Element {
    const [isSoftDeleting, setIsSoftDeleting] = useState(false);
    const [isForceDeleting, setIsForceDeleting] = useState(false);

    const { isLoading: isDeleteLoading, remove } = useDeleteAccount({
        id,
        type,
    });
    const { isLoading: isArchiveLoading, archive } = useArchiveAccount({
        id,
        type,
    });

    return (
        <>
            <div className={styles.container}>
                <Typography>
                    Are you sure you want to delete the account &quot;{name}
                    &quot; ?
                </Typography>

                <Checkbox
                    checked={isSoftDeleting}
                    label="I want to delete the account"
                    isFullWidth={true}
                    onChange={() => setIsSoftDeleting((prev) => !prev)}
                />

                <Checkbox
                    checked={isForceDeleting}
                    label="Delete related transactions"
                    isFullWidth={true}
                    onChange={() => setIsForceDeleting((prev) => !prev)}
                />
            </div>

            <ModalActions>
                <CancelAction onCancel={onClose} />
                <Button
                    text="Delete"
                    color="red"
                    variant="contained"
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
