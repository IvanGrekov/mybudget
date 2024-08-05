import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { EAppTitles } from 'types/appTitles';

export default function AccountDetailsLoading(): JSX.Element {
    return (
        <LoadingScreen
            description={`${EAppTitles.AccountDetails} are loading`}
        />
    );
}
