import { IAvatarProps } from 'components/avatar/types/avatarProps';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';

export const getTypographyVariant = (
    sise: IAvatarProps['size'],
): TTypographyVariants => {
    switch (sise) {
        case 'small':
            return 'body1';
        case 'large':
            return 'h6';
        default:
            return 'subtitle1';
    }
};
