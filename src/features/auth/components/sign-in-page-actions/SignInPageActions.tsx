import Button from 'components/button/Button';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import { EAppRoutes } from 'types/appRoutes';

interface ISignInPageActionsProps {
    isLoading: boolean;
    isSubmitDisabled: boolean;
}

export default function SignInPageActions({
    isLoading,
    isSubmitDisabled,
}: ISignInPageActionsProps): JSX.Element {
    const [signUpButtonText] = useGetFeatureTranslations({
        featureName: 'SignUp',
    });
    const [signInButtonText] = useGetFeatureTranslations({
        featureName: 'SignIn',
    });

    return (
        <>
            <Button
                href={`${EAppRoutes.Auth}${EAppRoutes.SignUp}`}
                text={signUpButtonText}
            />
            <Button
                variant="contained"
                text={signInButtonText}
                type="submit"
                isLoading={isLoading}
                isDisabled={isSubmitDisabled}
            />
        </>
    );
}
