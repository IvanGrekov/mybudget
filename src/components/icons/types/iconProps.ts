import { CSSProperties } from 'react';

import { EIconSizes } from 'components/icons/types/iconSizes';

export interface IIconProps {
    size?: number | keyof typeof EIconSizes;
    color?: string;
    className?: string;
    wrapperClassName?: string;
    style?: CSSProperties;
}
