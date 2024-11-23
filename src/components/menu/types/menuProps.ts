import { ReactElement } from 'react';

import {
    IButtonProps,
    IIconButtonProps,
} from 'components/button/types/buttonProps';
import { IDividerProps } from 'components/divider/types/dividerProps';
import { ISpacingProps } from 'components/spacing/types/spacingProps';
import { TTooltipPosition } from 'components/tooltip/types/tooltipProps';

export type TMenuActionItemProps = Pick<
    IButtonProps,
    'text' | 'onClick' | 'Icon' | 'title' | 'isDisabled'
>;

type TElement = ReactElement<
    TMenuActionItemProps | IDividerProps | ISpacingProps
>;

export interface IMenuProps {
    children: TElement | Array<TElement>;
    OpenMenuElement?: JSX.Element;
    tooltipPosition?: TTooltipPosition;
    iconSize?: IIconButtonProps['iconSize'];
    tooltipClassName?: string;
    actionsClassName?: string;
    actionsActiveClassName?: string;
}
