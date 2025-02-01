import { useState, useRef } from 'react';

import {
    TUseImagePreview,
    TOnInputChange,
    TUseDropZone,
    TImagePreview,
    TDragHandler,
    TUseImageInput,
} from 'components/image-input/types/imageInput.types';
import {
    setFile,
    checkIsAllowedFileType,
} from 'components/image-input/utils/imageInput.utils';
import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';
import { useInputLabelEnterKeyHandler } from 'hooks/useInputLabelEnterKeyHandler';

export const useImagePreview: TUseImagePreview = ({ inputRef, onChange }) => {
    const [imagePreview, setImagePreview] = useState<TImagePreview>(null);

    const onInputChange: TOnInputChange = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            setFile({ file, setImagePreview, onChange });
        } else {
            onChange?.(null);
            setImagePreview(null);
        }
    };

    const clearImage = (): void => {
        inputRef.current?.value && (inputRef.current.value = '');
        setImagePreview(null);
        onChange?.(null);
    };

    return {
        imagePreview,
        onInputChange,
        clearImage,
        setImagePreview,
    };
};

export const useDropZone: TUseDropZone = ({ setImagePreview, onChange }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const addErrorMessage = useAddErrorMessageToNotifications();

    const onDragEnter: TDragHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(true);
    };

    const onDragOver: TDragHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(true);
    };

    const onDragLeave: TDragHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);
    };

    const onDrop: TDragHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);

        const file = event.dataTransfer.files[0];
        const isAllowedFileType = checkIsAllowedFileType(file);

        if (isAllowedFileType) {
            setFile({ file, setImagePreview, onChange });
        } else {
            addErrorMessage(`File type '${file.type}' not allowed`);
        }
    };

    return {
        isDragActive,
        onDragEnter,
        onDragOver,
        onDragLeave,
        onDrop,
    };
};

export const useImageInput: TUseImageInput = (onChange) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    useInputLabelEnterKeyHandler(labelRef);
    const { setImagePreview, ...imagePreviewHookResult } = useImagePreview({
        inputRef,
        onChange,
    });
    const dropZoneHookResult = useDropZone({ setImagePreview, onChange });

    return {
        inputRef,
        labelRef,
        ...imagePreviewHookResult,
        ...dropZoneHookResult,
    };
};
