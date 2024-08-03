import { cloneElement } from 'react';

import {
    TRadioGroupProps,
    TElement,
} from 'components/radio-group/types/radioGroup.props';

type TPassDisableAndErrorPropsToChildren = (
    args: Pick<TRadioGroupProps, 'children' | 'error' | 'disabled'>,
) => TElement[];

export const passDisableAndErrorPropsToChildren: TPassDisableAndErrorPropsToChildren =
    ({ children, error, disabled }) => {
        let clonedChildren = [children].flat();

        if (disabled) {
            clonedChildren = clonedChildren.map((element) =>
                cloneElement(element, {
                    disabled,
                }),
            );
        }

        if (error) {
            clonedChildren = clonedChildren.map((element) =>
                cloneElement(element, {
                    error,
                }),
            );
        }

        return clonedChildren;
    };
