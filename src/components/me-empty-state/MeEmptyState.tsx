import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';

interface IMeEmptyStateProps {
    notWrappedByContainer?: boolean;
}

const TEXT = "We couldn't find your profile";

export default function MeEmptyState({
    notWrappedByContainer,
}: IMeEmptyStateProps): JSX.Element {
    if (notWrappedByContainer) {
        return <EmptyState text={TEXT} />;
    }

    return (
        <Container>
            <EmptyState text={TEXT} />
        </Container>
    );
}
