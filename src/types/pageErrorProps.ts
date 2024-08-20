export interface IPageErrorProps {
    error?: (Error & { digest?: string }) | string;
    reset?: VoidFunction;
}
