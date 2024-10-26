type TGetIsSubmitButtonDisabled = (args: {
    isDirty: boolean;
    errors: Record<string, unknown>;
}) => boolean;

export const getIsSubmitButtonDisabled: TGetIsSubmitButtonDisabled = ({
    isDirty,
    errors,
}) => {
    return !isDirty || Object.keys(errors).length > 0;
};
