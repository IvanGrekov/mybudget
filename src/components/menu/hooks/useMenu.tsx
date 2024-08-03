import { useState, MouseEventHandler } from 'react';

import { getElementWithOnClick } from 'components/menu/utils/getElementWithOnClick';

type TUseMenu = (OpenMenuElement?: JSX.Element) => {
    isOpen: boolean;
    OpenMenuElementWithOnClick: JSX.Element | null;
    onDeactivate: VoidFunction;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

export const useMenu: TUseMenu = (OpenMenuElement) => {
    const [isOpen, setIsOpen] = useState(false);

    const onDeactivate = (): void => {
        setIsOpen(false);
    };

    const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsOpen((prevState) => !prevState);
    };

    const OpenMenuElementWithOnClick = !OpenMenuElement
        ? null
        : getElementWithOnClick({ Element: OpenMenuElement, onClick });

    return {
        isOpen,
        OpenMenuElementWithOnClick,
        onDeactivate,
        onClick,
    };
};
