import { useMemo } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editUserCurrency } from 'actions/editUserCurrency';
import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import UserCurrencyFormContent from 'features/user-settings/components/user-currency-form-content/UserCurrencyFormContent';
import { USER_CURRENCY_FORM_VALIDATION } from 'features/user-settings/components/user-currency-modal/constants/userCurrencyFormValidation';
import { getDefaultCurrency } from 'features/user-settings/components/user-currency-modal/utils/getDefaultCurrency';
import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';
import { EFetchingTags } from 'types/fetchingTags';
import {
    EditUserCurrencyDto,
    User,
    UserDefaultCurrencyEnum,
} from 'types/generated.types';

interface IUserCurrencyModalContentProps {
    userId: number;
    userDefaultCurrency: UserDefaultCurrencyEnum;
    onClose: VoidFunction;
}

export default function UserCurrencyModalContent({
    userId,
    userDefaultCurrency,
    onClose,
}: IUserCurrencyModalContentProps): JSX.Element {
    const defaultCurrency = useMemo(
        () => getDefaultCurrency(userDefaultCurrency),

        [userDefaultCurrency],
    );

    const methods = useForm<EditUserCurrencyDto>({
        defaultValues: {
            defaultCurrency,
            isAccountsCurrencySoftUpdate: false,
            isTransactionCategoriesCurrencySoftUpdate: false,
            isTransactionCategoriesCurrencyForceUpdate: false,
        },
        resolver: USER_CURRENCY_FORM_VALIDATION,
    });

    const addErrorMessage = useAddErrorMessageToNotifications();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: EditUserCurrencyDto) => {
            return editUserCurrency(userId, { ...data });
        },
        onSuccess: (data) => {
            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                ...data,
            }));
            onClose();
        },
        onError: (error: Error) => {
            addErrorMessage({
                message: error.message,
            });
        },
    });

    const onSubmit: SubmitHandler<EditUserCurrencyDto> = (data) => {
        // eslint-disable-next-line no-console
        console.log(data);

        // mutate(data);
        mutate;
    };

    const { formState, handleSubmit } = methods;
    const { errors, dirtyFields } = formState;

    return (
        <>
            <UnderDevelopmentMessage />
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UserCurrencyFormContent />

                    <ModalActions>
                        <CancelAction onCancel={onClose} />
                        <Button
                            text="Change"
                            type="submit"
                            isLoading={isPending}
                            isDisabled={
                                !dirtyFields.defaultCurrency ||
                                Object.keys(errors).length > 0
                            }
                        />
                    </ModalActions>
                </form>
            </FormProvider>
        </>
    );
}
