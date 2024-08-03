import { Dispatch, SetStateAction } from 'react';

export type TMobileSidebarContextValue = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};
