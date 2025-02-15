import Button from 'components/button/Button';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import { EAppRoutes } from 'types/appRoutes';

interface ISignUpPageActionsProps {
    isLoading: boolean;
    isSubmitDisabled: boolean;
}

export default function SignUpPageActions({
    isLoading,
    isSubmitDisabled,
}: ISignUpPageActionsProps): JSX.Element {
    const [signInButtonText] = useGetFeatureTranslations({
        featureName: 'SignIn',
    });

    const [signUpButtonText] = useGetFeatureTranslations({
        featureName: 'SignUp',
    });

    return (
        <>
            <Button href={EAppRoutes.Auth} text={signInButtonText} />
            <Button
                variant="contained"
                text={signUpButtonText}
                type="submit"
                isLoading={isLoading}
                isDisabled={isSubmitDisabled}
            />
        </>
    );
}
