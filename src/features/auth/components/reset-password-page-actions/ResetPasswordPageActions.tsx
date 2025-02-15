import Button from 'components/button/Button';
import Show from 'components/show/Show';
import {
    useGetFeatureTranslations,
    useGetActionButtonsTranslations,
} from 'hooks/translations.hooks';
import { EAppRoutes } from 'types/appRoutes';

interface IResetPasswordPageActionsProps {
    isLoading: boolean;
    isSubmitDisabled: boolean;
    isSubmitHidden: boolean;
}

export default function ResetPasswordPageActions({
    isLoading,
    isSubmitDisabled,
    isSubmitHidden,
}: IResetPasswordPageActionsProps): JSX.Element {
    const cancelButtonText = useGetActionButtonsTranslations()('cancel');

    const [submitButtonText] = useGetFeatureTranslations({
        featureName: 'ResetPassword',
    });

    return (
        <>
            <Button text={cancelButtonText} href={EAppRoutes.Auth} />
            <Show when={!isSubmitHidden}>
                <Button
                    text={submitButtonText}
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={isSubmitDisabled}
                />
            </Show>
        </>
    );
}
