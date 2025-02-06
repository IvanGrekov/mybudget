'use client';

import Container from 'components/container/Container';
import PageError from 'components/page-error/PageError';
import { IPageErrorProps } from 'types/pageErrorProps';

export default function Error({ error, reset }: IPageErrorProps): JSX.Element {
    return (
        <Container>
            <PageError error={error} reset={reset} />
        </Container>
    );
}
