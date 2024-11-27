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
import EditTransactionCategoryModal from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/EditTransactionCategoryModal';
import ChangeCategoryCurrencyModal from 'features/transaction-category-list/components/change-currency-modal/ChangeCategoryCurrencyModal';
import DeleteTransactionCategoryModal from 'features/transaction-category-list/components/delete-transaction-category-modal/DeleteTransactionCategoryModal';
import Subcategories from 'features/transaction-category-list/components/transaction-category-card/Subcategories';
import styles from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { useIsMobile } from 'hooks/screenSize.hooks';
import { useModal } from 'hooks/useModal';
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

    const {
        isModalOpen: isEditAccountModalOpen,
        openModal: openEditAccountModal,
        closeModal: closeEditAccountModal,
    } = useModal();
    const {
        isModalOpen: isChangeCurrencyModalOpen,
        openModal: openChangeCurrencyModal,
        closeModal: closeChangeCurrencyModal,
    } = useModal();
    const {
        isModalOpen: isDeleteModalOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
    } = useModal();

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
                            openEditModal={openEditAccountModal}
                            openChangeCurrencyModal={openChangeCurrencyModal}
                            openDeleteModal={openDeleteModal}
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

            <EditTransactionCategoryModal
                transactionCategory={transactionCategory}
                isOpen={isEditAccountModalOpen}
                onClose={closeEditAccountModal}
            />

            <ChangeCategoryCurrencyModal
                id={id}
                type={type}
                name={name}
                currency={currency}
                isOpen={isChangeCurrencyModalOpen}
                onClose={closeChangeCurrencyModal}
            />

            <DeleteTransactionCategoryModal
                id={id}
                type={type}
                name={name}
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                hasChildren={!!children?.length}
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
            />
        </>
    );
}
