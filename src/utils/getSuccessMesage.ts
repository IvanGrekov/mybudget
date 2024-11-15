interface IGetSuccessMessageArgs {
    entityName: string;
    isEditing?: boolean;
    isRemoving?: boolean;
}

export const getSuccessMessage = ({
    entityName,
    isEditing,
    isRemoving,
}: IGetSuccessMessageArgs): string => {
    if (isEditing) {
        return `${entityName} has been updated!`;
    }

    if (isRemoving) {
        return `${entityName} has been removed!`;
    }

    return `${entityName} has been created!`;
};
