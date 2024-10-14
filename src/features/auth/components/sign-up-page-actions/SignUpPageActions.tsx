import Button from 'components/button/Button';
import Link from 'components/link/Link';
import { EAppRoutes } from 'types/appRoutes';

interface ISignUpPageActionsProps {
    isLoading: boolean;
    isSubmitDisabled: boolean;
}

export default function SignUpPageActions({
    isLoading,
    isSubmitDisabled,
}: ISignUpPageActionsProps): JSX.Element {
    return (
        <>
            <Link href={EAppRoutes.Auth} text="Sign In" />
            <Button
                text="Sign Up"
                type="submit"
                isLoading={isLoading}
                isDisabled={isSubmitDisabled}
            />
        </>
    );
}
