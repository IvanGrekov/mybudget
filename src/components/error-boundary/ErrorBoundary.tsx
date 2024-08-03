'use client';

import { Component, ReactNode } from 'react';

import EmptyState from 'components/empty-state/EmptyState';
import Spacing from 'components/spacing/Spacing';

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
            return (
                <>
                    <Spacing xs={60} xl={80} />
                    <EmptyState
                        isError={true}
                        text="Error occurred on the page. Try to reload the page"
                    />
                </>
            );
        }

        return this.props.children;
    }
}
