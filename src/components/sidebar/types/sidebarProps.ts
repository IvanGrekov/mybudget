import { IDrawerProps } from 'components/drawer/types/drawerProps';

export type TSidebarProps = Pick<
    IDrawerProps,
    'shouldAddCloseButton' | 'children' | 'className'
> & {
    mobileSidebarHeader?: IDrawerProps['header'];
};
