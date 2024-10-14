import Button from 'components/button/Button';
import Link from 'components/link/Link';
import { EAppRoutes } from 'types/appRoutes';

interface ISignInPageActionsProps {
    isLoading: boolean;
    isSubmitDisabled: boolean;
}

export default function SignInPageActions({
    isLoading,
    isSubmitDisabled,
}: ISignInPageActionsProps): JSX.Element {
    return (
        <>
            <Link
                href={`${EAppRoutes.Auth}${EAppRoutes.SignUp}`}
                text="Sign Up"
            />
            <Button
                text="Sign In"
                type="submit"
                isLoading={isLoading}
                isDisabled={isSubmitDisabled}
            />
        </>
    );
}
