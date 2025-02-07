import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import EntityIcon from 'components/entity-icon/EntityIcon';
import Tooltip from 'components/tooltip/Tooltip';
import Typography from 'components/typography/Typography';
import ChangeTransactionCategoryCurrencyModal from 'features/change-transaction-category-currency-modal/components/change-transaction-category-currency-modal/ChangeTransactionCategoryCurrencyModal';
import DeleteTransactionCategoryModal from 'features/delete-transaction-category-modal/components/delete-transaction-category-modal/DeleteTransactionCategoryModal';
import EditTransactionCategoryModal from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/EditTransactionCategoryModal';
import styles from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { useIsMobile } from 'hooks/screenSize.hooks';
import { useModal } from 'hooks/useModal';
import { EAppRoutes } from 'types/appRoutes';
import { TransactionCategory } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

interface ISubcategoriesProps {
    parentCategoryId: number;
    subcategories?: Maybe<TransactionCategory[]>;
}

export default function Subcategories({
    parentCategoryId,
    subcategories,
}: ISubcategoriesProps): JSX.Element | null {
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

    if (!subcategories) {
        return null;
    }

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
