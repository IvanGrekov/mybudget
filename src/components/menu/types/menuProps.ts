import { ReactElement } from 'react';

import {
    IButtonProps,
    IIconButtonProps,
} from 'components/button/types/buttonProps';
import { IDividerProps } from 'components/divider/types/dividerProps';
import { ISpacingProps } from 'components/spacing/types/spacingProps';

export type TMenuActionItemProps = Pick<
    IButtonProps,
    'text' | 'onClick' | 'Icon' | 'title' | 'isDisabled'
>;

type TElement = ReactElement<
    TMenuActionItemProps | IDividerProps | ISpacingProps
>;

export interface IMenuProps {
    children: TElement | Array<TElement | boolean>;
    OpenMenuElement?: JSX.Element;
    iconSize?: IIconButtonProps['iconSize'];
    className?: string;
    actionsClassName?: string;
    actionsActiveClassName?: string;
}
