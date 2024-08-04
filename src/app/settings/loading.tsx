import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { EAppTitles } from 'types/appTitles';

export default function SettingsLoading(): JSX.Element {
    return <LoadingScreen description={`${EAppTitles.Settings} are loading`} />;
}
