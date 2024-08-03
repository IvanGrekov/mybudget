export type TTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface ITooltipProps {
    children: JSX.Element;
    text: string;
    className?: string;
    position?: TTooltipPosition;
    open?: boolean;
}
