import { TBaseInputContainerProps } from 'types/input.types';

export type TTextFieldBaseProps = TBaseInputContainerProps & {
    label?: string;
    shouldHidePlaceholder?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    placeholderClassName?: string;
    textFieldWrapperClassName?: string;
};
