import { Dispatch, SetStateAction } from 'react';

import { INPUT_ACCEPT_ATTRIBUTE } from 'components/image-input/constants/imageInput.constants';
import {
    TImagePreview,
    TOnChange,
} from 'components/image-input/types/imageInput.types';

type TSetFile = (args: {
    file: File;
    setImagePreview: Dispatch<SetStateAction<TImagePreview>>;
    onChange?: TOnChange;
}) => void;

export const setFile: TSetFile = ({ file, setImagePreview, onChange }) => {
    const reader = new FileReader();
    reader.onloadend = (): void => {
        setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onChange?.(file);
};

export const checkIsAllowedFileType = (file: File): boolean => {
    return INPUT_ACCEPT_ATTRIBUTE.includes(file.type);
};
