import { useState } from 'react';

import cx from 'classnames';

import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import Button from 'components/button/Button';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import Divider from 'components/divider/Divider';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';
import ChangeCategoryCurrencyModal from 'features/transaction-category-list/components/change-currency-modal/ChangeCategoryCurrencyModal';
import DeleteTransactionCategoryModal from 'features/transaction-category-list/components/delete-transaction-category-modal/DeleteTransactionCategoryModal';
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

    const [isChangeCurrencyModalOpen, setIsChangeCurrencyModalOpen] =
        useState(false);
    const [isChildrenVisible, setIsChildrenVisible] = useState(false);
    const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);

    const { id, name, currency, children, type } = transactionCategory;

    const toggleChildrenVisibility = (): void => {
        setIsChildrenVisible((prev) => !prev);
    };

    return (
        <>
            <Card>
                <CardHeader
                    title={
                        <CardTitle
                            title={name}
                            variant={isMobile ? 'body1' : 'subtitle2'}
                            className={styles.title}
                        />
                    }
                    actions={
                        <BaseEntityMenu
                            detailsPath={`${EAppRoutes.TransactionCategories}/${id}`}
                            setIsChangeCurrencyModalOpen={
                                setIsChangeCurrencyModalOpen
                            }
                            setIsDeletingModalOpen={setIsDeletingModalOpen}
                        />
                    }
                />

                <CardContent className={styles.container}>
                    <Typography className={styles.currency}>
                        Currency:{' '}
                        <Typography element="span">{currency}</Typography>
                    </Typography>

                    <Show when={!!children.length}>
                        <div
                            className={cx(
                                styles['subcategories-toggle-button'],
                                {
                                    [styles[
                                        'subcategories-toggle-button--active'
                                    ]]: isChildrenVisible,
                                },
                            )}
                        >
                            <Button
                                text={
                                    isChildrenVisible
                                        ? 'Hide Subcategories'
                                        : 'Show Subcategories'
                                }
                                onClick={toggleChildrenVisibility}
                            />
                        </div>
                    </Show>

                    <Show when={isChildrenVisible}>
                        <Divider />
                        <Subcategories subcategories={children} />
                    </Show>
                </CardContent>
            </Card>

            <ChangeCategoryCurrencyModal
                id={id}
                type={type}
                name={name}
                currency={currency}
                isOpen={isChangeCurrencyModalOpen}
                onClose={() => setIsChangeCurrencyModalOpen(false)}
            />

            <DeleteTransactionCategoryModal
                id={id}
                type={type}
                name={name}
                isOpen={isDeletingModalOpen}
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                hasChildren={!!children?.length}
                onClose={() => setIsDeletingModalOpen(false)}
            />
        </>
    );
}
