export interface IPageErrorProps {
    error?: Error & { digest?: string };
    reset?: VoidFunction;
}
