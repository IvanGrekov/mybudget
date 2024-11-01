import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';

export default function MeEmptyState(): JSX.Element {
    return (
        <Container>
            <EmptyState text="We couldn't find your profile" />
        </Container>
    );
}
