'use client';

import { Component, ReactNode } from 'react';

import Error from 'components/page-error/PageError';

interface IErrorBoundaryProps {
    children: ReactNode;
}

interface IErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    public componentDidCatch(): void {
        this.setState({ hasError: true });
    }

    public render(): ReactNode {
        const { hasError } = this.state;

        if (hasError) {
            return <Error />;
        }

        return this.props.children;
    }
}
