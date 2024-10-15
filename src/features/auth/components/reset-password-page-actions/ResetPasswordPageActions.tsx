import Button from 'components/button/Button';
import Show from 'components/show/Show';
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
    return (
        <>
            <Button text="Cancel" href={EAppRoutes.Auth} />
            <Show when={!isSubmitHidden}>
                <Button
                    text="Reset Password"
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={isSubmitDisabled}
                />
            </Show>
        </>
    );
}
