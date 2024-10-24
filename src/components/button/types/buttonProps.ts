import { CSSProperties, MouseEventHandler } from 'react';

import { IIconProps } from 'components/icons/types/iconProps';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';

export interface IBaseButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    title?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    tabIndex?: number;
    type?: 'button' | 'submit';
    className?: string;
}

export interface IButtonProps extends IBaseButtonProps {
    text: string;
    form?: string;
    variant?: 'outlined' | 'contained' | 'ghost';
    size?: 'small' | 'big' | 'regular';
    textVariant?: TTypographyVariants;
    isLoading?: boolean;
    Icon?: (props: IIconProps) => JSX.Element;
    style?: CSSProperties;
    className?: string;
    color?: 'red' | 'green' | 'primary';
    href?: string;
}

export interface IIconButtonProps extends IBaseButtonProps {
    Icon: (props: IIconProps) => JSX.Element;
    variant?: 'primary' | 'overlayed';
    iconSize?: IIconProps['size'];
}
