import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import Modal from 'components/modal/Modal';
import Typography from 'components/typography/Typography';
import { useModal } from 'hooks/useModal';
import { UserDefaultCurrencyEnum } from 'types/generated.types';

interface IUserCurrencySectionProps {
    userDefaultCurrency: UserDefaultCurrencyEnum;
}

export default function UserCurrencySection({
    userDefaultCurrency,
}: IUserCurrencySectionProps): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <Button
                text="Change Currency"
                onClick={openModal}
            />

            <Modal
                isOpen={isModalOpen}
                title="Change Currency"
                size="medium"
                onClose={closeModal}
                actions={
                    <>
                        <CancelAction onCancel={closeModal} />
                    </>
                }
            >
                <Typography>
                    Current currency:{' '}
                    <Typography
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        {userDefaultCurrency}
                    </Typography>
                </Typography>

                <Typography>Feature is under development...</Typography>
            </Modal>
        </>
    );
}
