import EntityIcon from 'components/entity-icon/EntityIcon';
import { EIconSizes } from 'components/icons/types/iconSizes';
import Link from 'components/link/Link';
import Spacing from 'components/spacing/Spacing';
import SubcategoriesTogglerWrapper from 'components/subcategories-toggler-wrapper/SubcategoriesTogglerWrapper';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-category-details/components/transaction-category-subcategories/TransactionCategorySubcategories.module.scss';
import { EAppRoutes } from 'types/appRoutes';
import { TransactionCategory } from 'types/generated.types';

interface ITransactionCategorySubcategoriesProps {
    subcategories: TransactionCategory[];
}

export default function TransactionCategorySubcategories({
    subcategories,
}: ITransactionCategorySubcategoriesProps): JSX.Element {
    return (
        <>
            <Spacing xs={10} />

            <SubcategoriesTogglerWrapper>
                <Spacing xs={20} />

                <ul className={styles.subcategories}>
                    {subcategories.map((transactionCategory) => {
                        const { id, name, iconName, iconColor } =
                            transactionCategory;

                        return (
                            <li key={id} className={styles.subcategory}>
                                <Link
                                    href={`${EAppRoutes.TransactionCategories}/${id}`}
                                    target="_blank"
                                    className={styles['subcategory-link']}
                                >
                                    <div
                                        className={
                                            styles['subcategory-details']
                                        }
                                    >
                                        <EntityIcon
                                            iconName={iconName}
                                            iconColor={iconColor}
                                            isCategory={true}
                                            size={EIconSizes.small}
                                        />
                                        <Typography variant="subtitle2">
                                            {name}
                                        </Typography>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </SubcategoriesTogglerWrapper>
        </>
    );
}
