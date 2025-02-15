import Button from 'components/button/Button';
import CardFooter from 'components/card/CardFooter';
import ExpandableText from 'components/expandable-text/ExpandableText';
import Show from 'components/show/Show';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
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

    const [showMoreText, showLessText] = useGetFeatureTranslations({
        featureName: 'ActionButtons',
        keys: ['show_more', 'show_less'],
    });

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
                    marginBottom: isOverflow ? 24 : 0,
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
                    text={isExpanded ? showLessText : showMoreText}
                    size="small"
                    variant="text"
                    onClick={toggleExpanding}
                />
            </Show>
        </CardFooter>
    );
}
