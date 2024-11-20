interface IGetSuccessMessageArgs {
    entityName: string;
    isEditing?: boolean;
    isRemoving?: boolean;
    isArchiving?: boolean;
}

export const getSuccessMessage = ({
    entityName,
    isEditing,
    isRemoving,
    isArchiving,
}: IGetSuccessMessageArgs): string => {
    if (isEditing) {
        return `${entityName} has been updated!`;
    }

    if (isRemoving) {
        return `${entityName} has been removed!`;
    }

    if (isArchiving) {
        return `${entityName} has been archived!`;
    }

    return `${entityName} has been created!`;
};
