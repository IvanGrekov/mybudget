import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import { IChipProps } from 'components/chip/types/chipProps';
import EmptyState from 'components/empty-state/EmptyState';
import EntityChipList from 'components/entity-chip-list/EntityChipList';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { getColorForTypeChip } from 'features/transaction-category-details/components/transaction-category-details/utils/getColorForTypeChip';
import {
    TransactionCategory,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';
import { getCapitalizedString } from 'utils/string.utils';

interface ITransactionCategoryDetailsProps {
    transactionCategory: TransactionCategory;
}

export default function TransactionCategoryDetails({
    transactionCategory,
}: ITransactionCategoryDetailsProps): JSX.Element {
    const { status, type, currency, children } = transactionCategory;

    if (status === TransactionCategoryStatusEnum.ARCHIVED) {
        return <EmptyState text="Transaction Category is archived" />;
    }

    const chips: IChipProps[] = [
        {
            title: getCapitalizedString(type, '_'),
            color: getColorForTypeChip(type),
        },
        {
            title: `Currency: ${currency}`,
        },
    ];

    const shouldShowChildren = !!children?.length;

    // TODO: List children (IG)

    return (
        <>
            <UnderDevelopmentMessage />

            <Card>
                <CardHeader
                    shouldHideBorder={!shouldShowChildren}
                    title={<EntityChipList items={chips} />}
                    // actions={
                    //     <BaseEntityMenu
                    //         detailsPath={`${EAppRoutes.Accounts}/${id}`}
                    //         openEditModal={openEditAccountModal}
                    //         openChangeCurrencyModal={openChangeCurrencyModal}
                    //         openDeleteModal={openDeleteModal}
                    //     />
                    // }
                />
                {shouldShowChildren && (
                    <CardContent>
                        <UnderDevelopmentMessage />
                    </CardContent>
                )}
            </Card>
        </>
    );
}
