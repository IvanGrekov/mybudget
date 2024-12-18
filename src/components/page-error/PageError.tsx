'use client';

import { useEffect } from 'react';

import EmptyState from 'components/empty-state/EmptyState';
import Spacing from 'components/spacing/Spacing';
import { IPageErrorProps } from 'types/pageErrorProps';

export default function PageError({ error }: IPageErrorProps): JSX.Element {
    useEffect(() => {
        if (!error) {
            return;
        }

        console.error(error);
    }, [error]);

    return (
        <>
            <Spacing xs={60} xl={80} />
            <EmptyState
                isError={true}
                text={
                    typeof error === 'string'
                        ? error
                        : error?.message ||
                          'Error occurred on the page. Try to reload the page'
                }
            />
        </>
    );
}
