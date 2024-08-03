import { ReactElement } from 'react';

import { IRadioProps } from 'components/radio/types/radio.props';
import { TBaseInputContainerProps } from 'types/input.types';

export type TElement = ReactElement<IRadioProps>;

export type TRadioGroupProps = TBaseInputContainerProps & {
    children: TElement | TElement[];
    title?: string;
    required?: boolean;
    disabled?: boolean;
    containerClassName?: string;
    titleClassName?: string;
    className?: string;
};
