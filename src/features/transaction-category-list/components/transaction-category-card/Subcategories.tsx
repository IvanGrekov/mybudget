import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import EntityIcon from 'components/entity-icon/EntityIcon';
import Tooltip from 'components/tooltip/Tooltip';
import Typography from 'components/typography/Typography';
import EditTransactionCategoryModal from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/EditTransactionCategoryModal';
import ChangeCategoryCurrencyModal from 'features/transaction-category-list/components/change-currency-modal/ChangeCategoryCurrencyModal';
import DeleteTransactionCategoryModal from 'features/transaction-category-list/components/delete-transaction-category-modal/DeleteTransactionCategoryModal';
import styles from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { useIsMobile } from 'hooks/screenSize.hooks';
import { useModal } from 'hooks/useModal';
import { EAppRoutes } from 'types/appRoutes';
import { TransactionCategory } from 'types/generated.types';

interface ISubcategoriesProps {
    parentCategoryId: number;
    subcategories: TransactionCategory[];
}

export default function Subcategories({
    parentCategoryId,
    subcategories,
}: ISubcategoriesProps): JSX.Element {
    const isMobile = useIsMobile();

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

    return (
        <ul className={styles.subcategories}>
            {subcategories.map((transactionCategory) => {
                const { id, name, type, currency, iconName, iconColor } =
                    transactionCategory;

                return (
                    <li key={id} className={styles.subcategory}>
                        <EntityIcon
                            iconName={iconName}
                            iconColor={iconColor}
                            isCategory={true}
                        />

                        <Tooltip text={name}>
                            <Typography
                                variant={isMobile ? 'body1' : 'subtitle2'}
                                element="h4"
                                lineClamp={1}
                                className={styles.title}
                            >
                                {name}
                            </Typography>
                        </Tooltip>

                        <BaseEntityMenu
                            detailsPath={`${EAppRoutes.TransactionCategories}/${id}`}
                            className={styles['subcategory-menu']}
                            openEditModal={openEditAccountModal}
                            openChangeCurrencyModal={openChangeCurrencyModal}
                            openDeleteModal={openDeleteModal}
                        />

                        <EditTransactionCategoryModal
                            transactionCategory={transactionCategory}
                            parentId={parentCategoryId}
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
                            hasChildren={false}
                            parentId={parentCategoryId}
                            isOpen={isDeleteModalOpen}
                            onClose={closeDeleteModal}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
