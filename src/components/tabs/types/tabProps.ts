export interface ITabProps {
    value: string;
    label: string;
    isDisabled?: boolean;
    customCurrentTab?: string;
    customClickHandler?: VoidFunction;
}
