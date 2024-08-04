'use client';

import PageError from 'components/page-error/PageError';
import { IPageErrorProps } from 'types/pageErrorProps';

export default function Error({ error, reset }: IPageErrorProps): JSX.Element {
    return <PageError error={error} reset={reset} />;
}
