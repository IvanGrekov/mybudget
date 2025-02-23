'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import EmptyState from 'components/empty-state/EmptyState';
import Spacing from 'components/spacing/Spacing';
import { IPageErrorProps } from 'types/pageErrorProps';
import log from 'utils/log';

export default function PageError({ error }: IPageErrorProps): JSX.Element {
    const emptyStateTranslations = useTranslations('EmptyState');

    useEffect(() => {
        if (!error) {
            return;
        }

        log('unhandled page error', error);
    }, [error]);

    const text =
        process.env.NODE_ENV === 'development'
            ? typeof error === 'string'
                ? error
                : error?.message ||
                  'Error occurred on the page. Try to reload the page'
            : undefined;

    return (
        <>
            <Spacing xs={60} xl={80} />
            <EmptyState
                emptyStateTranslations={emptyStateTranslations}
                isError={true}
                text={text}
            />
        </>
    );
}
