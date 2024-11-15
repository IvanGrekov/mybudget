interface IGetIsFormSubmitButtonDisabledProps {
    dirtyFields: Record<string, unknown>;
    errors: Record<string, unknown>;
}

export const getIsFormSubmitButtonDisabled = ({
    dirtyFields,
    errors,
}: IGetIsFormSubmitButtonDisabledProps): boolean => {
    return (
        Object.keys(dirtyFields).length === 0 || Object.keys(errors).length > 0
    );
};
