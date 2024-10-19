import { useState, useCallback } from 'react';

interface IUseModalResult {
    isModalOpen: boolean;
    openModal: VoidFunction;
    closeModal: VoidFunction;
}

export function useModal(): IUseModalResult {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback((): void => setIsModalOpen(true), []);
    const closeModal = useCallback((): void => setIsModalOpen(false), []);

    return { isModalOpen, openModal, closeModal };
}
