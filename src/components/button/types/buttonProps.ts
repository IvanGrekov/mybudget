import { CSSProperties, MouseEventHandler, FC } from 'react';

import { IIconProps } from 'components/icons/types/iconProps';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';

export interface IBaseButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    title?: string;
    href?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    tabIndex?: number;
    type?: 'button' | 'submit';
    className?: string;
}

export interface IButtonProps extends IBaseButtonProps {
    text: string;
    form?: string;
    variant?: 'outlined' | 'contained' | 'ghost' | 'text';
    size?: 'small' | 'big' | 'regular';
    textVariant?: TTypographyVariants;
    isLoading?: boolean;
    Icon?: FC<IIconProps>;
    iconColor?: IIconProps['color'];
    style?: CSSProperties;
    className?: string;
    linkClassName?: string;
    color?: 'red' | 'green' | 'primary';
}

export interface IIconButtonProps extends IBaseButtonProps {
    Icon: FC<IIconProps>;
    variant?: 'primary' | 'overlayed';
    iconSize?: IIconProps['size'];
    iconColor?: IIconProps['color'];
}
