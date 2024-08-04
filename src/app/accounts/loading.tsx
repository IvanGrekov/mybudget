import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { EAppTitles } from 'types/appTitles';

export default function AccountsLoading(): JSX.Element {
    return <LoadingScreen description={`${EAppTitles.Accounts} are loading`} />;
}
