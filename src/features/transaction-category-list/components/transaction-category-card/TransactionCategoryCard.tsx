import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import EntityIcon from 'components/entity-icon/EntityIcon';
import Show from 'components/show/Show';
import Spacing from 'components/spacing/Spacing';
import SubcategoriesTogglerWrapper from 'components/subcategories-toggler-wrapper/SubcategoriesTogglerWrapper';
import Typography from 'components/typography/Typography';
import ChangeTransactionCategoryCurrencyModal from 'features/change-transaction-category-currency-modal/components/change-transaction-category-currency-modal/ChangeTransactionCategoryCurrencyModal';
import DeleteTransactionCategoryModal from 'features/delete-transaction-category-modal/components/delete-transaction-category-modal/DeleteTransactionCategoryModal';
import EditTransactionCategoryModal from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/EditTransactionCategoryModal';
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

    const {
        isModalOpen: isEditModalOpen,
        openModal: openEditModal,
        closeModal: closeEditModal,
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

    const { id, name, currency, children, type, iconName, iconColor } =
        transactionCategory;

    return (
        <>
            <Card>
                <CardHeader
                    title={
                        <>
                            <EntityIcon
                                iconName={iconName}
                                iconColor={iconColor}
                                isCategory={true}
                            />
                            <CardTitle
                                title={name}
                                titleVariant={isMobile ? 'body1' : 'subtitle2'}
                                className={styles.title}
                            />
                        </>
                    }
                    actions={
                        <BaseEntityMenu
                            detailsPath={`${EAppRoutes.TransactionCategories}/${id}`}
                            openEditModal={openEditModal}
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

                    <Show when={!!children?.length}>
                        <Spacing xs={12} />

                        <SubcategoriesTogglerWrapper>
                            <Subcategories
                                parentCategoryId={id}
                                subcategories={children}
                            />
                        </SubcategoriesTogglerWrapper>
                    </Show>
                </CardContent>
            </Card>

            <EditTransactionCategoryModal
                transactionCategory={transactionCategory}
                hasChildren={!!children?.length}
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
            />

            <ChangeTransactionCategoryCurrencyModal
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
                hasChildren={!!children?.length}
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
            />
        </>
    );
}
