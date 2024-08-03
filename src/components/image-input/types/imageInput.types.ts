import {
    InputHTMLAttributes,
    ChangeEventHandler,
    Dispatch,
    SetStateAction,
    RefObject,
    DragEventHandler,
} from 'react';

import { TTypographyVariants } from 'components/typography/types/typographyVariants';
import { TBaseInputContainerProps } from 'types/input.types';

type TFileInputHTMLAttributes = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'placeholder' | 'multiple' | 'accept' | 'onChange'
>;

export type TOnChange = (file: File | null) => void;

export type TImageInputProps = TBaseInputContainerProps &
    TFileInputHTMLAttributes & {
        placeholder?: string;
        caption?: string;
        placeholderVariant?: TTypographyVariants;
        containerClassName?: string;
        labelClassName?: string;
        placeholderClassName?: string;
        onChange?: TOnChange;
    };

export type TImageInputPlaceholderProps = Pick<
    TImageInputProps,
    | 'disabled'
    | 'required'
    | 'placeholder'
    | 'caption'
    | 'placeholderVariant'
    | 'placeholderClassName'
>;

export type TOnInputChange = ChangeEventHandler<HTMLInputElement>;

export type TImagePreview = string | null;

type TSetImagePreview = Dispatch<SetStateAction<TImagePreview>>;

interface ITUseImagePreviewResult {
    imagePreview: TImagePreview;
    setImagePreview: TSetImagePreview;
    onInputChange: TOnInputChange;
    clearImage: VoidFunction;
}

export type TUseImagePreview = (args: {
    inputRef: RefObject<HTMLInputElement>;
    onChange?: TOnChange;
}) => ITUseImagePreviewResult;

export type TDragHandler = DragEventHandler<HTMLLabelElement>;

interface IUseDropZoneResult {
    isDragActive: boolean;
    onDragEnter: TDragHandler;
    onDragOver: TDragHandler;
    onDragLeave: TDragHandler;
    onDrop: TDragHandler;
}

export type TUseDropZone = (args: {
    setImagePreview: TSetImagePreview;
    onChange?: TOnChange;
}) => IUseDropZoneResult;

type TUseImageInputResult = Omit<ITUseImagePreviewResult, 'setImagePreview'> &
    IUseDropZoneResult & {
        inputRef: RefObject<HTMLInputElement>;
        labelRef: RefObject<HTMLLabelElement>;
    };

export type TUseImageInput = (onChange?: TOnChange) => TUseImageInputResult;
