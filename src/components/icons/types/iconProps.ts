import { CSSProperties } from 'react';

import { EIconSizes } from 'components/icons/types/iconSizes';
import { Maybe } from 'types/utility.types';

export interface IIconProps {
    size?: number | keyof typeof EIconSizes;
    color?: Maybe<string>;
    className?: string;
    wrapperClassName?: string;
    style?: CSSProperties;
}
