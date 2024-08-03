import { EAvatarSizes } from 'components/avatar/types/avatarSizes';

export interface IAvatarProps {
    name: string;
    image?: string;
    size?: keyof typeof EAvatarSizes;
    className?: string;
    onClick?: VoidFunction;
}
