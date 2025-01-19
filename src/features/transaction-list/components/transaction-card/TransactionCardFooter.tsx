import Button from 'components/button/Button';
import CardFooter from 'components/card/CardFooter';
import ExpandableText from 'components/expandable-text/ExpandableText';
import Show from 'components/show/Show';
import { useIsOverflow } from 'hooks/useIsOverflow';
import { Maybe } from 'types/utility.types';

interface ITransactionCardFooterProps {
    description: Maybe<string>;
}

const MAX_VISIBLE_HEIGHT = 38;

export default function TransactionCardFooter({
    description,
}: ITransactionCardFooterProps): JSX.Element | null {
    const { containerRef, isOverflow, isExpanded, toggleExpanding } =
        useIsOverflow();

    if (!description) {
        return null;
    }

    return (
        <CardFooter>
            <div
                ref={containerRef}
                style={{
                    maxHeight: isExpanded ? 'none' : MAX_VISIBLE_HEIGHT,
                    overflow: isOverflow ? 'hidden' : 'visible',
                    marginBottom: isOverflow ? 20 : 0,
                }}
            >
                <ExpandableText
                    isOverflow={isOverflow}
                    isExpanded={isExpanded}
                    text={description}
                />
            </div>

            <Show when={isOverflow}>
                <Button
                    text={isExpanded ? 'Show less' : 'Show more'}
                    size="small"
                    variant="text"
                    onClick={toggleExpanding}
                />
            </Show>
        </CardFooter>
    );
}
