import { useState } from 'react';

interface IUseModalResult {
    isModalOpen: boolean;
    openModal: VoidFunction;
    closeModal: VoidFunction;
}

export function useModal(): IUseModalResult {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return {
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
    };
}
