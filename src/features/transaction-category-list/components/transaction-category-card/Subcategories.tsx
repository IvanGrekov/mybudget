import { useState } from 'react';

import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import Tooltip from 'components/tooltip/Tooltip';
import Typography from 'components/typography/Typography';
import DeleteTransactionCategoryModal from 'features/transaction-category-list/components/delete-transaction-category-modal/DeleteTransactionCategoryModal';
import styles from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { useIsMobile } from 'hooks/screenSize.hooks';
import { EAppRoutes } from 'types/appRoutes';
import { TransactionCategory } from 'types/generated.types';

interface ISubcategoriesProps {
    subcategories: TransactionCategory[];
}

export default function Subcategories({
    subcategories,
}: ISubcategoriesProps): JSX.Element {
    const isMobile = useIsMobile();

    const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);

    return (
        <ul className={styles.subcategories}>
            {subcategories.map(({ id, name, type }) => (
                <li key={id} className={styles.subcategory}>
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
                        setIsDeletingModalOpen={setIsDeletingModalOpen}
                    />

                    <DeleteTransactionCategoryModal
                        id={id}
                        type={type}
                        name={name}
                        isOpen={isDeletingModalOpen}
                        hasChildren={false}
                        isSubcategory={true}
                        onClose={() => setIsDeletingModalOpen(false)}
                    />
                </li>
            ))}
        </ul>
    );
}
