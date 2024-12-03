import { TransactionCategory } from 'types/generated.types';

interface IGetNewParentChildrenArgs {
    currentChildren?: TransactionCategory[];
    transactionCategory: TransactionCategory;
    isArchiving: boolean;
    isActivating: boolean;
}

type TGetNewParentChildren = (
    args: IGetNewParentChildrenArgs,
) => TransactionCategory[] | undefined;

const getNewParentChildren: TGetNewParentChildren = ({
    currentChildren,
    transactionCategory,
    isArchiving,
    isActivating,
}) => {
    if (!currentChildren) {
        return;
    }

    if (isArchiving) {
        return currentChildren.filter(
            (child) => child.id !== transactionCategory.id,
        );
    }

    if (isActivating) {
        return [...currentChildren, transactionCategory];
    }

    return currentChildren;
};

type TUpdateTransactionCategory = (
    transactionCategory?: TransactionCategory,
) => unknown;

type TGetUpdateTransactionCategory = (
    args: Pick<IGetNewParentChildrenArgs, 'isArchiving' | 'isActivating'> & {
        updatedTransactionCategory: TransactionCategory;
        parentId?: number;
    },
) => TUpdateTransactionCategory;

export const getUpdateTransactionCategory: TGetUpdateTransactionCategory = ({
    updatedTransactionCategory,
    isArchiving,
    isActivating,
    parentId,
}) => {
    const { status, name } = updatedTransactionCategory;

    return (transactionCategory) => {
        if (transactionCategory?.id === updatedTransactionCategory.id) {
            return {
                ...transactionCategory,
                status,
                name,
            };
        }

        if (
            (isArchiving || isActivating) &&
            parentId &&
            transactionCategory?.id === parentId
        ) {
            const currentChildren = transactionCategory.children;

            return {
                ...transactionCategory,
                children: getNewParentChildren({
                    currentChildren,
                    transactionCategory: updatedTransactionCategory,
                    isArchiving,
                    isActivating,
                }),
            };
        }

        return transactionCategory;
    };
};
