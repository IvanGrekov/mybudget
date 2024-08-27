'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Button from 'components/button/Button';
import { useCookiesAgreementModalData } from 'components/cookies-agreement-modal/hooks/useCookiesAgreementModalData';
import Modal from 'components/modal/Modal';
import Typography from 'components/typography/Typography';

export default function CookiesAgreementModal(): JSX.Element {
    const isShowed = useRef(false);
    const [isOpen, setIsOpen] = useState(false);
    const { shouldShowModal, acceptCookies, declineCookies } =
        useCookiesAgreementModalData();

    useEffect(() => {
        if (shouldShowModal && !isShowed.current) {
            setIsOpen(true);
            isShowed.current = true;
        }
    }, [shouldShowModal]);

    const onClose = useCallback(() => {
        declineCookies();
        setIsOpen(false);
    }, [declineCookies]);

    const onConfirm = useCallback(() => {
        acceptCookies();
        setIsOpen(false);
    }, [acceptCookies]);

    return (
        <Modal
            title="This website uses cookies"
            isOpen={isOpen}
            size="small"
            onClose={onClose}
            actions={
                <>
                    <Button text="Decline" onClick={onClose} />
                    <Button
                        text="Accept"
                        variant="contained"
                        onClick={onConfirm}
                    />
                </>
            }
        >
            <Typography>
                Hey! Before you jump into exploring our app, we&apos;d like to
                get your permission to use cookies to enhance your experience.
                Don&apos;t worry, we&apos;ve got your privacy covered!
            </Typography>
        </Modal>
    );
}
