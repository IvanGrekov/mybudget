import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import { TTranslations } from 'types/translations';

interface IMeEmptyStateProps {
    emptyStateTranslations: TTranslations;
    notWrappedByContainer?: boolean;
}

export default function MeEmptyState({
    emptyStateTranslations,
    notWrappedByContainer,
}: IMeEmptyStateProps): JSX.Element {
    const text = emptyStateTranslations('profile_not_found');

    if (notWrappedByContainer) {
        return <EmptyState text={text} />;
    }

    return (
        <Container>
            <EmptyState text={text} />
        </Container>
    );
}
