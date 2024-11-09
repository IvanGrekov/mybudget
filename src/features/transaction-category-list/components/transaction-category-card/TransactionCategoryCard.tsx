import { useState } from 'react';

import Button from 'components/button/Button';
import ButtonGroup from 'components/button-group/ButtonGroup';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardTitle from 'components/card/CardTitle';
import Divider from 'components/divider/Divider';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';
import Subcategories from 'features/transaction-category-list/components/transaction-category-card/Subcategories';
import styles from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { useIsMobile } from 'hooks/screenSize.hooks';
import { EAppRoutes } from 'types/appRoutes';
import { TransactionCategory } from 'types/generated.types';

interface ITransactionCategoryCardProps {
    transactionCategory: TransactionCategory;
}

export default function TransactionCategoryCard({
    transactionCategory,
}: ITransactionCategoryCardProps): JSX.Element {
    const isMobile = useIsMobile();
    const [isChildrenVisible, setIsChildrenVisible] = useState(false);

    const { id, name, currency, children } = transactionCategory;

    const toggleChildrenVisibility = (): void => {
        setIsChildrenVisible((prev) => !prev);
    };

    return (
        <Card>
            <CardContent className={styles.container}>
                <div className={styles.header}>
                    <CardTitle
                        title={name}
                        variant={isMobile ? 'body1' : 'subtitle2'}
                        className={styles.title}
                    />
                    <Typography variant={isMobile ? 'caption' : 'body2'}>
                        Currency: {currency}
                    </Typography>
                </div>

                <ButtonGroup isReverse={true} className={styles.actions}>
                    <Button
                        text="Details"
                        href={`${EAppRoutes.TransactionCategories}/${id}`}
                    />

                    <Show when={!!children.length}>
                        <Button
                            text={
                                isChildrenVisible
                                    ? 'Hide Subcategories'
                                    : 'Show Subcategories'
                            }
                            onClick={toggleChildrenVisibility}
                        />
                    </Show>
                </ButtonGroup>

                <Show when={isChildrenVisible}>
                    <Divider />
                    <Subcategories subcategories={children} />
                </Show>
            </CardContent>
        </Card>
    );
}
