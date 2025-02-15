import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import { IChipProps } from 'components/chip/types/chipProps';
import EmptyState from 'components/empty-state/EmptyState';
import EntityChipList from 'components/entity-chip-list/EntityChipList';
import { getColorForTypeChip } from 'features/transaction-category-details/components/transaction-category-details/utils/getColorForTypeChip';
import TransactionCategoryMenu from 'features/transaction-category-details/components/transaction-category-menu/TransactionCategoryMenu';
import TransactionCategorySubcategories from 'features/transaction-category-details/components/transaction-category-subcategories/TransactionCategorySubcategories';
import EntityTransactionList from 'features/transaction-list/components/entity-transaction-list/EntityTransactionList';
import {
    TransactionCategory,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';
import { TTranslations } from 'types/translations';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface ITransactionCategoryDetailsProps {
    transactionCategory: TransactionCategory;
    emptyStateTranslations: TTranslations;
    entityNameTranslations: TTranslations;
}

export default function TransactionCategoryDetails({
    transactionCategory,
    emptyStateTranslations,
    entityNameTranslations,
}: ITransactionCategoryDetailsProps): JSX.Element {
    const { status, type, currency, children } = transactionCategory;

    if (status === TransactionCategoryStatusEnum.ARCHIVED) {
        return (
            <EmptyState
                text={emptyStateTranslations('archived_transaction_category')}
            />
        );
    }

    const chips: IChipProps[] = [
        {
            title: getCapitalizedEnumValue(type, entityNameTranslations),
            color: getColorForTypeChip(type),
        },
        {
            title: `${entityNameTranslations('currency')}: ${currency}`,
        },
    ];

    const shouldShowChildren = !!children?.length;

    return (
        <>
            <Card>
                <CardHeader
                    shouldHideBorder={!shouldShowChildren}
                    title={<EntityChipList items={chips} />}
                    actions={
                        <TransactionCategoryMenu
                            transactionCategory={transactionCategory}
                        />
                    }
                />
                {shouldShowChildren && (
                    <CardContent>
                        <TransactionCategorySubcategories
                            subcategories={children}
                        />
                    </CardContent>
                )}
            </Card>

            <EntityTransactionList
                selectedTransactionCategory={transactionCategory}
                considerFromAsIncome={true}
                considerToAsExpense={true}
            />
        </>
    );
}
